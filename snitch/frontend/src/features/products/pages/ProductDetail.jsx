import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import useProduct from '../hooks/useProduct';
import useAuth from '../../auth/hooks/useAuth';
import useCart from '../../cart/hooks/useCart';


const ProductDetail = () => {
    const { id } = useParams();
    const { getProductById, loading } = useProduct();
    const { addToCart } = useCart();
    const { user } = useAuth();
    const [product, setProduct] = useState(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    const fetchProductDetails = async () => {
        try {
            const data = await getProductById(id);
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }

    useEffect(() => {
        fetchProductDetails();
    }, [id])

    const nextImage = () => {
        const images = selectedVariant ? selectedVariant.images : product?.images;
        if (images && images.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }
    };

    const prevImage = () => {
        const images = selectedVariant ? selectedVariant.images : product?.images;
        if (images && images.length > 0) {
            setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
        }
    };

    const handleBuy = () => {
        console.log('Buy button clicked');
    };

    const handleAddToCart = async () => {
        if (!selectedSize) {
            alert("Please select a size before adding to cart.");
            return;
        }

        let variantId = selectedVariant?._id;
        let currentPrices;
        if (!variantId) {
            variantId=product.variants?.[0]?._id;
            currentPrices =product.price;

        }else{
            currentPrices=selectedVariant.price;
        }
        

        try {
            await addToCart(product._id, variantId, 1, currentPrices,selectedSize);
            alert("Item added to cart successfully!");
        } catch (error) {
            alert("Failed to add item to cart: " + error.message);
        }
        
    };

    const handleVariantSelect = (variant) => {
        setSelectedVariant(variant);
        setCurrentImageIndex(0);
        if (variant) {
            setSelectedColor(variant.attributes.color);
            setSelectedSize(variant.attributes.size);
        } else {
            setSelectedColor(null);
            setSelectedSize(null);
        }
    };

    const handleColorSelect = (color) => {
        setSelectedColor(color);
        setCurrentImageIndex(0);
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        setCurrentImageIndex(0);
    };
    
    useEffect(() => {
        if (selectedColor && selectedSize) {
            const variant = product.variants.find(v => 
                v.attributes.color === selectedColor && 
                (Array.isArray(v.attributes.size) ? v.attributes.size.includes(selectedSize) : v.attributes.size === selectedSize)
            );
            if (variant) setSelectedVariant(variant);
        } else if (!selectedColor && !selectedSize) {
            setSelectedVariant(null);
        }

    }, [selectedColor, selectedSize, product]);

    if (loading && !product) return <div className="flex justify-center items-center h-screen"><h1 className="text-2xl font-bold">Loading...</h1></div>;

    if (!product) return <div className="flex justify-center items-center h-screen"><p className="text-xl">Product not found.</p></div>;

    // Find images and price based on current selection
    const colorVariant = selectedColor ? product.variants.find(v => v.attributes.color === selectedColor) : null;
    const currentImages = selectedVariant ? selectedVariant.images : (colorVariant ? colorVariant.images : product.images);
    const currentPrice = selectedVariant ? selectedVariant.price : (colorVariant ? colorVariant.price : product.price);
    const currentStock = selectedVariant ? selectedVariant.stock : 'In Stock';

    const DUMMY_SIZES = ['S', 'M', 'L', 'XL'];
    const availableSizes = selectedColor
        ? [...new Set(product.variants
            .filter(v => v.attributes.color === selectedColor)
            .flatMap(v => Array.isArray(v.attributes.size) ? v.attributes.size : [v.attributes.size]))]
        : DUMMY_SIZES;

    return (
        <div className="select-none max-w-4xl mx-auto p-6 bg-white backdrop-blur-md shadow-2xl rounded-3xl my-10 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-10">
                {/* Image Slider Section */}
                <div className="md:w-1/2">
                    {currentImages && currentImages.length > 0 && (
                        <div className="relative group">
                            <img
                                src={currentImages[currentImageIndex].url}
                                alt={`Product image ${currentImageIndex + 1}`}
                                className="w-full h-96 object-cover rounded-2xl shadow-2xl transition-all duration-500 group-hover:scale-[1.01]"
                            />
                            {currentImages.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-gray-900 p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 border border-gray-200"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-gray-900 p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 border border-gray-200"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </>
                            )}
                            <div className="flex flex-wrap gap-3 mt-6">
                                {currentImages.map((image, index) => (
                                    <button
                                        key={image._id || index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${index === currentImageIndex ? 'border-indigo-500 scale-110 shadow-lg shadow-indigo-500/20' : 'border-transparent hover:border-white/20 opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={image.url} alt="thumbnail" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div className="md:w-1/2 space-y-3">
                    <div className="">
                        <div className="flex justify-between items-start">
                            <h1 className="text-4xl capitalize font-black text-gray-900 tracking-tighter">{product.title}</h1>
                            {user && user._id === product.seller._id && (
                                <Link
                                    to={`/products/${id}/add-variant`}
                                    className="bg-indigo-600/10 border border-indigo-500/30 text-indigo-600 px-5 py-2.5 rounded-xl hover:bg-indigo-600 hover:text-white font-bold transition-all duration-300"
                                >
                                    + Add Variant
                                </Link>
                            )}
                        </div>
                        <p className=" text-gray-400 leading-relaxed font-medium">{product.description}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-black text-indigo-500">
                            {currentPrice.currency == "INR" ? "₹" : "$"} {currentPrice.amount}
                        </span>
                        {selectedVariant && (
                            <span className={`px-4 rounded-xl text-sm font-bold uppercase tracking-widest border ${selectedVariant.stock > 0 ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                {selectedVariant.stock > 0 ? `${selectedVariant.stock} In Stock` : 'Sold Out'}
                            </span>
                        )}
                    </div>

                    {/* Variants Selection - Separate Color and Size */}
                    {product.variants && product.variants.length > 0 && (
                        <div className="space-y-8 pt-4 border-t border-gray-100">
                            {/* Color Selection with Images */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Select Color</h3>
                                <div className="flex flex-wrap gap-4">
                                    {/* Default Variant Option */}
                                    <button
                                        onClick={() => handleVariantSelect(null)}
                                        className={`group flex flex-col items-center gap-2 transition-all duration-300`}
                                    >
                                        <div className={`w-16 h-16 rounded overflow-hidden border-2 transition-all duration-300 ${!selectedVariant ? 'border-indigo-500 scale-110 shadow-lg shadow-indigo-500/20' : 'border-gray-100 opacity-60 hover:opacity-100'}`}>
                                            <img
                                                src={product.images?.[0]?.url}
                                                alt="Default"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </button>

                                    {/* Map unique colors to their first appearing variant's image */}
                                    {Array.from(new Map(product.variants.map(v => [v.attributes.color, v])).values()).map((variant, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleColorSelect(variant.attributes.color)}
                                            className={`group flex flex-col items-center gap-2 transition-all duration-300`}
                                        >
                                            <div className={`w-16 h-16 rounded overflow-hidden border-2 transition-all duration-300 ${selectedColor === variant.attributes.color ? 'border-indigo-500 scale-110 shadow-lg shadow-indigo-500/20' : 'border-gray-100 opacity-60 hover:opacity-100'}`}>
                                                <img
                                                    src={variant.images?.[0]?.url || product.images?.[0]?.url}
                                                    alt={variant.attributes.color}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${selectedColor === variant.attributes.color ? 'text-indigo-600' : 'text-gray-400'}`}>
                                                {variant.attributes.color}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Size Selection - Always show dummy or real sizes */}
                            <div className="">
                                <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Select Size</h3>
                                <div className="flex flex-wrap gap-3">
                                    {availableSizes.map((size, index) => {
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => handleSizeSelect(size)}
                                                className={`min-w-[60px] h-12 rounded-xl border-2 font-black transition-all duration-300 flex items-center justify-center uppercase tracking-widest text-xs
                                                    ${selectedSize === size
                                                        ? 'border-indigo-500 bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                                                        : 'border-gray-100 text-gray-600 hover:border-gray-200 hover:text-gray-900'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* <div className="space-y-4 pt-8 border-t border-white/5">
                        <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Seller</h3>
                        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-black">
                                {product.seller.name[0].toUpperCase()}
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-lg">{product.seller.name}</p>
                                <p className="text-gray-500 font-medium">{product.seller.email}</p>
                            </div>
                        </div>
                    </div> */}

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleBuy}
                            disabled={selectedVariant && selectedVariant.stock === 0}
                            className="flex-1 px-3 py-4 bg-white text-black rounded-2xl font-black text-lg hover:bg-gray-200 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl shadow-white/5"
                        >
                            BUY NOW
                        </button>
                        <button
                            onClick={handleAddToCart}
                            disabled={selectedVariant && selectedVariant.stock === 0}
                            className="flex-1 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-transparent disabled:cursor-not-allowed border border-indigo-500 transition-all duration-300 shadow-2xl shadow-indigo-500/20"
                        >
                            ADD TO CART
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
