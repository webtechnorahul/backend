import express from 'express';
import { addToCart, getCart, removeFromCart, clearCart } from '../controllers/cart.controller.js';
import { isTokenValid } from '../middleware/auth.middlewale.js';
import { addToCartValidator } from '../validator/cart.validator.js';

const router = express.Router();

// Add item to cart
router.post('/add', isTokenValid, addToCartValidator, addToCart);

// Get user's cart
router.get('/get', isTokenValid, getCart);

// Remove item from cart
router.delete('/remove/:variantId', isTokenValid, removeFromCart);

// Clear cart
router.delete('/clear', isTokenValid, clearCart);

export default router;
