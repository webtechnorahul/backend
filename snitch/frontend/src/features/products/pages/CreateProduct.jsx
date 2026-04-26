import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useProduct from '../hooks/useProduct';

const CreateProduct = () => {
    const { createProduct, loading, error, clearProductError,addVariant } = useProduct();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        description: '',
        priceAmount: '',
        priceCurrency: 'INR',
        images: [],
        attributes: {
            color: '',
            size: ''
        },
        stock: ''
    });
    const [createdId, setCreatedId] = useState(null);
    const [previewImages, setPreviewImages] = useState([]);

    const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'attr_color' || name === 'attr_size') {
        setForm((prev) => ({
            ...prev,
            attributes: {
                ...prev.attributes,
                color: name === 'attr_color' ? value : prev.attributes.color,
                size: name === 'attr_size'
                    ? value.split(',').map(s => s.trim())
                    : prev.attributes.size
            }
        }));
    } else {
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    }
};

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setForm({ ...form, images: files });
        setPreviewImages(files.map(file => URL.createObjectURL(file)));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearProductError();
        try {
            const product = await createProduct({
                title: form.title,
                description: form.description,
                priceAmount: parseFloat(form.priceAmount),
                priceCurrency: form.priceCurrency,
                images: form.images
            });
            if (product && product._id) {
                setCreatedId(product._id);
            }
            const variants=await addVariant(product._id, {
                priceAmount: parseFloat(form.priceAmount),
                priceCurrency: 'INR',
                attributes: {
                color: form.attributes.color,
                size: form.attributes.size
                },
                stock: parseInt(form.stock) || 0,
                images: form.images
            });
        } catch (err) {
            console.error(err);
        }
    };

    if (createdId) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white border border-gray-200 p-10 rounded-3xl text-center space-y-8 shadow-2xl">
                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto text-4xl">
                        ✓
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-gray-900">Product Created!</h2>
                        <p className="text-gray-400 mt-2">What would you like to do next?</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Link 
                            to={`/products/${createdId}/add-variant`}
                            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20"
                        >
                            ADD VARIANTS
                        </Link>
                        <Link 
                            to={`/products/${createdId}`}
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-4 rounded-2xl font-black hover:bg-gray-100 transition-all"
                        >
                            VIEW PRODUCT
                        </Link>
                        <button 
                            onClick={() => { setCreatedId(null); setForm({ title: '', description: '', priceAmount: '', priceCurrency: 'INR', images: [] }); setPreviewImages([]); }}
                            className="text-gray-500 hover:text-gray-900 font-bold text-sm uppercase tracking-widest pt-4"
                        >
                            Create Another
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl my-10 border border-gray-100">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Create Base Product</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider">Product Title</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                            placeholder="Enter product title"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                            placeholder="Describe your product..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider">Price Amount</label>
                            <input
                                type="number"
                                name="priceAmount"
                                value={form.priceAmount}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                                placeholder="0.00"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider">Currency</label>
                            <select
                                name="priceCurrency"
                                value={form.priceCurrency}
                                onChange={handleChange}
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                            >
                                <option value="INR">INR</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                            </select>
                        </div>
                    </div>

                    {/* attributes and stock features */}
                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider">Attributes</label>
                        <div className="space-y-3">
                        <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider">Stock Quantity</label>
                        <input
                            type="number"
                            name="stock"
                            value={form.stock}
                            onChange={handleChange}
                            required
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                            placeholder="e.g. 50"
                        />
                    </div>

                    {/* Attributes Section */}
                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider">Color</label>
                        <input
                            type="text"
                            name="attr_color"
                            value={form.attributes.color}
                            onChange={handleChange}
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                            placeholder="e.g. Red, Blue"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider">Sizes (Comma separated)</label>
                        <input
                            type="text"
                            name="attr_size"
                            value={Array.isArray(form.attributes.size) ? form.attributes.size.join(', ') : form.attributes.size}
                            onChange={handleChange}
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                            placeholder="e.g. S, M, L, XL"
                        />
                    </div>
                    </div>

                    {/* Images Section */}
                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider">Product Images</label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all hover:border-indigo-500 group">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-10 h-10 mb-4 text-gray-500 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-sm text-gray-400 font-medium">Click to upload product images</p>
                                </div>
                                <input type="file" multiple onChange={handleFileChange} className="hidden" accept="image/*" required />
                            </label>
                        </div>
                        
                        {previewImages.length > 0 && (
                            <div className="grid grid-cols-4 gap-6 mt-6">
                                {previewImages.map((url, i) => (
                                    <div key={i} className="relative group overflow-hidden rounded-xl aspect-square">
                                        <img src={url} alt="preview" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-sm font-medium text-center">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-8 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 disabled:bg-gray-700 transition-all shadow-xl shadow-indigo-500/20 tracking-widest uppercase"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-3">
                            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            CREATING PRODUCT...
                        </span>
                    ) : 'CREATE PRODUCT'}
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;
