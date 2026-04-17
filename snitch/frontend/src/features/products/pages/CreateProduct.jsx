import React, { useState } from 'react';
import useProduct from '../hooks/useProduct';

const CreateProduct = () => {
    const { createProduct, loading, error, clearProductError } = useProduct();
    const [form, setForm] = useState({
        title: '',
        description: '',
        priceAmount: '',
        priceCurrency: 'INR',
        images: []
    });
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setForm({
            ...form,
            images: Array.from(e.target.files)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title || !form.description || !form.priceAmount || form.images.length === 0) {
            alert('All fields are required, including at least one image.');
            return;
        }
        clearProductError();
        setSuccess(null);
        try {
            await createProduct({
                title: form.title,
                description: form.description,
                priceAmount: parseFloat(form.priceAmount),
                priceCurrency: form.priceCurrency,
                images: form.images
            });
            setSuccess('Product created successfully!');
            // Reset form
            setForm({
                title: '',
                description: '',
                priceAmount: '',
                priceCurrency: 'INR',
                images: []
            });
        } catch (err) {
            // Error is handled by the hook
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 py-10">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Create Product</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        required
                    />
                    <input
                        type="number"
                        name="priceAmount"
                        placeholder="Price Amount"
                        value={form.priceAmount}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        step="0.01"
                        required
                    />
                    <select
                        name="priceCurrency"
                        value={form.priceCurrency}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;