import axios from 'axios'

const api = axios.create({
    baseURL: "/api/cart",
    withCredentials: true
})

export async function addToCartAPI(product, variant, quantity, price,size) {
    const response = await api.post('/add', { product, variant, quantity, price,size });
    return response.data;
}

export async function getCartAPI() {
    const response = await api.get('/get');
    return response.data;
}

export async function removeFromCartAPI(variantId) {
    const response = await api.delete(`/remove/${variantId}`);
    return response.data;
}

export async function clearCartAPI() {
    const response = await api.delete('/clear');
    return response.data;
}
