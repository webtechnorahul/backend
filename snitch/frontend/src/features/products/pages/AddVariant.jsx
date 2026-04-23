import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useProduct from '../hooks/useProduct';

const AddVariant = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addVariant, loading, error } = useProduct();
    
    const [formData, setFormData] = useState({
        priceAmount: '',
        priceCurrency: 'INR',
        stock: '',
        attributes: {
            color: '',
            size: ''
        }
    });
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('attr_')) {
            const attrName = name.replace('attr_', '');
            setFormData(prev => ({
                ...prev,
                attributes: {
                    ...prev.attributes,
                    [attrName]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addVariant(id, {
                ...formData,
                images
            });
            navigate(`/products/${id}`);
        } catch (err) {
            console.error('Failed to add variant:', err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-3xl my-10 border border-gray-100">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Add New Variant</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Price Section */}
                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider">Price Amount</label>
                        <input
                            type="number"
                            name="priceAmount"
                            value={formData.priceAmount}
                            onChange={handleInputChange}
                            required
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                            placeholder="e.g. 999"
                        />
                    </div>
                    
                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider">Currency</label>
                        <select
                            name="priceCurrency"
                            value={formData.priceCurrency}
                            onChange={handleInputChange}
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                        >
                            <option value="INR">INR</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </div>

                    {/* Stock Section */}
                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider">Stock Quantity</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleInputChange}
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
                            value={formData.attributes.color}
                            onChange={handleInputChange}
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                            placeholder="e.g. Red, Blue"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider">Size</label>
                        <input
                            type="text"
                            name="attr_size"
                            value={formData.attributes.size}
                            onChange={handleInputChange}
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                            placeholder="e.g. S, M, L, XL"
                        />
                    </div>
                </div>

                {/* Images Section */}
                <div className="space-y-4">
                    <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider">Variant Images</label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all hover:border-indigo-500 group">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-10 h-10 mb-4 text-gray-500 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                <p className="text-sm text-gray-400">Click to upload variant images</p>
                            </div>
                            <input type="file" multiple onChange={handleImageChange} className="hidden" accept="image/*" />
                        </label>
                    </div>
                    
                    {previewImages.length > 0 && (
                        <div className="grid grid-cols-4 gap-6 mt-6">
                            {previewImages.map((url, i) => (
                                <div key={i} className="relative group overflow-hidden rounded-xl">
                                    <img src={url} alt="preview" className="w-full h-28 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-xs text-white font-bold">PREVIEW</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-sm font-medium">
                        {error}
                    </div>
                )}

                <div className="flex gap-6 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex-1 px-8 py-5 border border-gray-200 text-gray-900 rounded-2xl font-bold hover:bg-gray-50 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 px-8 py-5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 disabled:bg-gray-700 transition-all shadow-xl shadow-indigo-500/20"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Uploading...
                            </span>
                        ) : 'Add Variant'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddVariant;
