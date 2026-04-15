import express from 'express'
import { authenticateSeller } from '../middleware/auth.middlewale.js'
import multer from 'multer'
import { createProduct } from '../controllers/product.controller.js'


const productRouter=express.Router()


const upload=multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
})



productRouter.post('/newProduct',authenticateSeller,upload.array('images',7),createProduct)


export default productRouter;
