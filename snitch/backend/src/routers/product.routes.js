import express from 'express'
import { authenticateSeller } from '../middleware/auth.middlewale.js'
import multer from 'multer'
import { createProduct,getSellerProducts,allProducts ,ProductDetails} from '../controllers/product.controller.js'


const productRouter=express.Router()


const upload=multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
})



productRouter.get('/allproducts',allProducts)
productRouter.post('/newProduct',authenticateSeller,upload.array('images',7),createProduct)
productRouter.get('/myproducts',authenticateSeller,getSellerProducts)
productRouter.get('/:id',ProductDetails)



export default productRouter;
