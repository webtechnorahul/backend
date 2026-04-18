import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useProduct from '../hooks/useProduct';


const ProductDetail = () => {
    const {id}=useParams();
    const {getProductById,loading}=useProduct();
    const [products, setproduct] = useState(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const fetchProductDetails = async () => {
            try {
                const product = await getProductById(id);
                setproduct(product);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
    }
    useEffect(()=>{
        fetchProductDetails();
    },[])

    const nextImage = () => {
        if (products && products.images.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % products.images.length);
        }
    };

    const prevImage = () => {
        if (products && products.images.length > 0) {
            setCurrentImageIndex((prev) => (prev - 1 + products.images.length) % products.images.length);
        }
    };

    const handleBuy = () => {
        console.log('Buy button clicked');
        // Add buy logic here
    };

    const handleAddToCart = () => {
        console.log('Add to Cart button clicked');
        // Add to cart logic here
    };

  return (
    <>
    {loading?(<h1>loading...</h1>):(
        <div className="select-none max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {products ? (
                <div className="flex flex-col md:flex-row">
                    {/* Image Slider Section */}
                    <div className="md:w-1/2 p-4">
                        {products.images && products.images.length > 0 && (
                            <div className=" cursor-pointer relative group">
                                <img
                                    src={products.images[currentImageIndex].url}
                                    alt={`Product image ${currentImageIndex + 1}`}
                                    className="w-full h-96 object-cover rounded-lg shadow-md"
                                />
                                {products.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute cursor-pointer left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-75 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        >
                                            ‹
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className=" cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-75 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        >
                                            ›
                                        </button>
                                        <div className="flex justify-center mt-4 space-x-2">
                                            {products.images.map((image, index) => (
                                                <button
                                                    key={image._id}
                                                    onClick={() => setCurrentImageIndex(index)}
                                                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 ${index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'}`}
                                                >
                                                    <img
                                                        src={image.url}
                                                        alt={`Thumbnail ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    {/* Details Section */}
                    <div className="md:w-1/2 p-4">
                        <h1 className="text-3xl font-bold mb-4">{products.title}</h1>
                        <p className="text-gray-600 mb-4">{products.description}</p>
                        <div className="mb-4">
                            <span className="text-2xl font-semibold text-green-600">
                                {products.price.currency} {products.price.amount}
                            </span>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-2">Seller Information</h2>
                            <p><strong>Name:</strong> {products.seller.name}</p>
                            <p><strong>Email:</strong> {products.seller.email}</p>
                        </div>
                        <div className="flex space-x-4 mb-4">
                            <button
                                onClick={handleBuy}
                                className="cursor-pointer bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Buy Now
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className="cursor-pointer bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                            >
                                Add to Cart
                            </button>
                        </div>
                        <div className="text-sm text-gray-500">
                            <p>Updated: {new Date(products.updatedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Product not found.</p>
            )}
        </div>
    )}
    </>
  )
}

export default ProductDetail