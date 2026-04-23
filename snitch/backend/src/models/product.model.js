import mongoose from 'mongoose';
import priceSchema from './price.schema.js';


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',    
        required: true
    },
    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            enum: [ "USD", "EUR", "GBP", "JPY", "INR" ],
            default: "INR"
        }
    },
    images: [
        {
            url: {
                type: String,
                required: true
            }
        }
    ],
    variants: [
        {
            images: [
                {
                    url: {
                        type: String,
                        required: true
                    }
                }
            ],
            stock: {
                type: Number,
                default: 0
            },
            attributes: {
                type: Map,
                of: mongoose.Schema.Types.Mixed
            },
            price: priceSchema
        }
    ]
}, { timestamps: true })


const productModel = mongoose.model('product', productSchema);

export default productModel;