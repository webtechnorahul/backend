import express from 'express'
import { authenticateSeller } from '../middleware/auth.middlewale.js'
import multer from 'multer'
import {
    createProduct,
    getSellerProducts,
    allProducts,
    ProductDetails,
    addVariant,
    getVariants,
    deleteVariant
} from '../controllers/product.controller.js'


const productRouter = express.Router()


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
})



// ── Product Routes ─────────────────────────────────────────
productRouter.get('/allproducts', allProducts)
productRouter.post('/newProduct', authenticateSeller, upload.array('images', 7), createProduct)
productRouter.get('/myproducts', authenticateSeller, getSellerProducts)
productRouter.get('/:id', ProductDetails)

// ── Variant Routes ─────────────────────────────────────────
// POST   /api/products/:id/variants        → add a variant (with images)
// GET    /api/products/:id/variants        → get all variants of a product
// DELETE /api/products/:id/variants/:variantId → delete a variant
productRouter.post('/:id/variants', authenticateSeller, upload.array('images', 7), addVariant)
productRouter.get('/:id/variants', getVariants)
productRouter.delete('/:id/variants/:variantId', authenticateSeller, deleteVariant)



export default productRouter;
