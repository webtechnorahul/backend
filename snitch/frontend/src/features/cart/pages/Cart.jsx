import React from 'react';
import useCart from '../hooks/useCart';
import useProduct from '../../products/hooks/useProduct';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, loading, removeFromCart, clearCart } = useCart();
    const { products, getAllProducts } = useProduct();

    React.useEffect(() => {
        getAllProducts();
    }, []);

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price.amount * item.quantity), 0);
    };

    if (loading && cart.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    // Filter out products already in cart for recommendations
    const recommendations = products.filter(p => !cart.some(item => item.product?._id === p._id)).slice(0, 4);

    return (
        <div className="max-w-6xl mx-auto p-6 my-10">
            <h1 className="text-4xl font-black text-gray-900 mb-10 tracking-tighter">Your Shopping Bag</h1>
            
            {cart.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-xl text-gray-500 font-medium mb-6">Your bag is empty</p>
                    <Link to="/products" className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Cart Items */}
                    <div className="lg:w-2/3 space-y-6">
                        {cart.map((item) => {
                            const variantDetails = item.product?.variants?.find(v => v._id.toString() === item.variant.toString());
                            const displayImage = variantDetails?.images?.[0]?.url || item.product?.images?.[0]?.url;
                            
                            return (
                                <div key={item._id} className="flex gap-6 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                    <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                                        <img 
                                            src={displayImage} 
                                            alt={item.product?.title} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-xl font-bold text-gray-900">{item.product?.title}</h3>
                                                <button 
                                                    onClick={() => removeFromCart(item.variant)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="flex gap-4 mt-2">
                                                {variantDetails?.attributes?.color && (
                                                    <span className="text-xs font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                                                        Color: {variantDetails.attributes.color}
                                                    </span>
                                                )}
                                                {item.size && (
                                                    <span className="text-xs font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                                                        Size: {item.size||variantDetails.attributes.size}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-500 text-sm mt-3 font-medium">Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <span className="text-lg font-black text-indigo-600">₹ {item.price.amount * item.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        
                        <button 
                            onClick={clearCart}
                            className="text-red-500 font-bold hover:text-red-600 transition-colors px-4 py-2"
                        >
                            Clear Shopping Bag
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-gray-900 text-white p-8 rounded-3xl sticky top-10">
                            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span className="text-white">₹ {calculateTotal()}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Shipping</span>
                                    <span className="text-green-400 uppercase text-xs font-bold tracking-widest mt-1">Free</span>
                                </div>
                                <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-center">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-2xl font-black text-indigo-400">₹ {calculateTotal()}</span>
                                </div>
                            </div>
                            <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-indigo-500/20">
                                Checkout
                            </button>
                            <p className="text-center text-gray-500 text-xs mt-6 font-medium">
                                Secure checkout powered by Stripe
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Recommendations Section */}
            {recommendations.length > 0 && (
                <div className="mt-20">
                    <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">Recommended for you</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {recommendations.map((product) => (
                            <Link key={product._id} to={`/products/${product._id}`} className="group">
                                <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4 border border-gray-100">
                                    <img 
                                        src={product.images?.[0]?.url} 
                                        alt={product.title} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{product.title}</h3>
                                <p className="text-indigo-500 font-black mt-1">₹ {product.price.amount}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
