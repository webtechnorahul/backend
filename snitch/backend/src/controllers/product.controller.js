import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";


export async function createProduct(req, res) {

    const { title, description, priceAmount, priceCurrency } = req.body;
    const seller= req.user;
    const images = await Promise.all(req.files.map(async (file) => {
        return await uploadFile({
            buffer: file.buffer,
            fileName: file.originalname
        })
    }))
    const product = await productModel.create({
        title,
        description,
        price: {
            amount: priceAmount,
            currency: priceCurrency || "INR"
        },
        images,
        seller: seller._id
    })


    res.status(201).json({
        message: "Product created successfully",
        success: true,
        product
    })
}

export async function getSellerProducts(req, res) {
    const seller = req.user;

    const products = await productModel.find({ seller: seller._id });

    res.status(200).json({
        message: "Products fetched successfully",
        success: true,
        products
    })
}

export async function allProducts(req,res){
    const products=await productModel.find().populate('seller')
    res.status(200).json({
        message:"All products fetched successfully",
        success:true,
        products
    })
}

export async function ProductDetails(req,res){
    const {id}=req.params;
    if(!id){
        return res.status(400).json({
            message:"Product id is required",
            success:false
        })
    }
    const product=await productModel.findById(id).populate('seller')
    if(!product){
        return res.status(404).json({
            message:"Product not found",
            success:false
        })
    }
    res.status(200).json({
        message:"Product details fetched successfully",
        success:true,
        product
    })
}

// ───── ADD VARIANT ─────
// POST /api/products/:id/variants
// Body (multipart/form-data):
//   images[]     → image files
//   stock        → number  (optional, default 0)
//   priceAmount  → number  (required)
//   priceCurrency→ string  (optional, default INR)
//   attributes   → JSON string  e.g. '{"color":"red","size":"M"}'
export async function addVariant(req, res) {
    try {
        const { id } = req.params;

        // 1. Find product
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }

        // 2. Only the seller who owns the product can add variants
        if (product.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Forbidden: You are not the seller of this product",
                success: false
            });
        }

        // 3. Upload variant images to ImageKit
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                message: "At least one variant image is required",
                success: false
            });
        }

        const images = await Promise.all(
            req.files.map(async (file) =>
                await uploadFile({
                    buffer: file.buffer,
                    fileName: file.originalname,
                    folder: "snitch/variants"
                })
            )
        );

        // 4. Parse attributes (sent as JSON string from form-data)
        let attributes = {};
        if (req.body.attributes) {
            try {
                attributes = JSON.parse(req.body.attributes);
            } catch {
                return res.status(400).json({
                    message: "attributes must be a valid JSON string e.g. '{\"color\":\"red\"}'",
                    success: false
                });
            }
        }

        // 5. Build variant object
        const variant = {
            images,
            stock: req.body.stock ? Number(req.body.stock) : 0,
            attributes,
            price: {
                amount: Number(req.body.priceAmount),
                currency: req.body.priceCurrency || "INR"
            }
        };

        // 6. Push variant and save
        product.variants.push(variant);
        await product.save();

        res.status(201).json({
            message: "Variant added successfully",
            success: true,
            variant: product.variants[product.variants.length - 1],
            product
        });

    } catch (err) {
        console.error("addVariant error:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
}

// ───── GET ALL VARIANTS ─────
// GET /api/products/:id/variants
export async function getVariants(req, res) {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id).select("variants title");
        if (!product) {
            return res.status(404).json({ message: "Product not found", success: false });
        }
        res.status(200).json({
            message: "Variants fetched successfully",
            success: true,
            variants: product.variants
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false, error: err.message });
    }
}

// ───── DELETE A VARIANT ─────
// DELETE /api/products/:id/variants/:variantId
export async function deleteVariant(req, res) {
    try {
        const { id, variantId } = req.params;
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found", success: false });
        }
        if (product.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Forbidden", success: false });
        }

        product.variants = product.variants.filter(
            (v) => v._id.toString() !== variantId
        );
        await product.save();

        res.status(200).json({
            message: "Variant deleted successfully",
            success: true
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false, error: err.message });
    }
}
