import axios from 'axios'

const api = axios.create({
    baseURL: "/api/products",
    withCredentials: true
})

export async function createProductAPI({ title, description, priceAmount, priceCurrency, images }) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('priceAmount', priceAmount);
    formData.append('priceCurrency', priceCurrency || 'INR');

    images.forEach((image, index) => {
        formData.append('images', image);
    });

    const response = await api.post('/newProduct', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
}

export async function getSellerProductsAPI() {
    const response = await api.get('/myproducts');
    return response.data;
}
export async function getAllProductsAPI() {
    const response = await api.get('/allproducts');
    return response.data;
}
export async function getProductByIdAPI(productId) {
    const response = await api.get(`/${productId}`);
    return response.data;
}

export async function addVariantAPI(productId, { images, stock, priceAmount, priceCurrency, attributes }) {
    const formData = new FormData();
    formData.append('stock', stock);
    formData.append('priceAmount', priceAmount);
    formData.append('priceCurrency', priceCurrency || 'INR');
    formData.append('attributes', JSON.stringify(attributes));

    images.forEach((image) => {
        formData.append('images', image);
    });

    const response = await api.post(`/${productId}/variants`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
}

export async function getVariantsAPI(productId) {
    const response = await api.get(`/${productId}/variants`);
    return response.data;
}

export async function deleteVariantAPI(productId, variantId) {
    const response = await api.delete(`/${productId}/variants/${variantId}`);
    return response.data;
}