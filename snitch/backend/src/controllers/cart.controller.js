import cartModel from "../models/cart.model.js";

// Add item to cart
export const addToCart = async (req, res) => {
    // try {
        const { product, variant, quantity, price,size } = req.body;
        const userId = req.user._id;

        // Find user's cart
        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            // Create new cart if doesn't exist
            cart = await cartModel.create({
                userId,
                items: [{ product, variant, quantity, price, size }]
            });
        } else {
            // Check if item already exists in cart
            const itemIndex = cart.items.findIndex(
                (item) => item.variant.toString() === variant.toString()
            );

            if (itemIndex > -1) {
                // Update quantity if item exists
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Add new item if doesn't exist
                cart.items.push({ product, variant, quantity, price,size });
            }
            await cart.save();
        }

        res.status(200).json({
            success: true,
            message: "Item added to cart successfully",
            cart
        });
    // } catch (error) {
    //     console.error("Error in addToCart:", error);
    //     res.status(500).json({
    //         success: false,
    //         message: "Internal server error",
    //         error: error.message
    //     });
    // }
};

// Get user's cart
export const getCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await cartModel.findOne({ userId }).populate("items.product");

        if (!cart) {
            return res.status(200).json({
                success: true,
                message: "Cart is empty",
                cart: { items: [] }
            });
        }

        res.status(200).json({
            success: true,
            message: "Cart fetched successfully",
            cart
        });
    } catch (error) {
        console.error("Error in getCart:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
    try {
        const { variantId } = req.params;
        const userId = req.user._id;

        const cart = await cartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            (item) => item.variant.toString() !== variantId
        );

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Item removed from cart successfully",
            cart
        });
    } catch (error) {
        console.error("Error in removeFromCart:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Clear cart
export const clearCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await cartModel.findOneAndDelete({ userId });

        res.status(200).json({
            success: true,
            message: "Cart cleared successfully"
        });
    } catch (error) {
        console.error("Error in clearCart:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};
