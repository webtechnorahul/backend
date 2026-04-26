import { useState, useEffect } from "react";
import { getCartAPI, removeFromCartAPI, addToCartAPI, clearCartAPI } from "../services/cart.api";

const useCart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const response = await getCartAPI();
            if (response.success) {
                setCart(response.cart.items || []);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (variantId) => {
        try {
            setLoading(true);
            const response = await removeFromCartAPI(variantId);
            if (response.success) {
                setCart(response.cart.items || []);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        try {
            setLoading(true);
            await clearCartAPI();
            setCart([]);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (product, variant, quantity, price,size) => {
        try {
            setLoading(true);
            const response = await addToCartAPI(product, variant, quantity, price,size);
            if (response.success) {
                setCart(response.cart.items || []);
            }
            return response;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return {
        cart,
        loading,
        error,
        fetchCart,
        removeFromCart,
        clearCart,
        addToCart
    };
};

export default useCart;
