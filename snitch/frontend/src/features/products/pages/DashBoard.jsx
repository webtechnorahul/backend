import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useProduct from '../hooks/useProduct';

const DashBoard = () => {
  const navigate = useNavigate();
  const { getAllProducts, loading } = useProduct();
  const [sellerProducts, setSellerProducts] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalRevenue: 0,
    avgPrice: 0,
  });
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState({});

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  const fetchSellerProducts = async () => {
    try {
      const products = await getAllProducts();
      
      if (products && Array.isArray(products)) {
        setSellerProducts(products);
        
        // Calculate stats
        const totalProducts = products.length;
        const totalRevenue = products.reduce((sum, product) => {
          return sum + (product.price?.amount || 0);
        }, 0);
        const avgPrice = totalProducts > 0 ? (totalRevenue / totalProducts).toFixed(2) : 0;
        
        setStats({
          totalProducts,
          totalRevenue,
          avgPrice,
        });
      }
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    setDeleteLoading(prev => ({ ...prev, [productId]: true }));
    try {
      // Call delete API - adjust based on your API
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setSellerProducts(prev => prev.filter(p => p._id !== productId));
        setStats(prev => ({
          ...prev,
          totalProducts: prev.totalProducts - 1,
        }));
      } else {
        setError('Failed to delete product');
      }
    } catch (err) {
      setError('Error deleting product');
      console.error('Error deleting product:', err);
    } finally {
      setDeleteLoading(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleEditProduct = (productId) => {
    // Navigate to edit page or open edit modal
    navigate(`/seller/edit-product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Seller Dashboard</h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Total Products</h2>
            <p className="text-3xl font-bold text-blue-600">{stats.totalProducts}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Total Revenue</h2>
            <p className="text-3xl font-bold text-green-600">${stats.totalRevenue}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Avg Price</h2>
            <p className="text-3xl font-bold text-purple-600">${stats.avgPrice}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap space-x-4">
            <Link
              to="/seller/create-product"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              + Create New Product
            </Link>
            <Link
              to="/seller/my-products"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              View All Products
            </Link>
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Products</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : sellerProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left">Image</th>
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Created</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sellerProducts.slice(0, 5).map((product) => (
                    <tr key={product._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">
                        <img
                          src={product.images?.[0]?.url || '/placeholder.jpg'}
                          alt={product.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-2 font-medium">{product.title}</td>
                      <td className="px-4 py-2">
                        {product.price?.currency} {product.price?.amount}
                      </td>
                      <td className="px-4 py-2 text-sm">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 space-x-2">
                        <Link
                          to={`/products/${product._id}`}
                          className="text-blue-500 hover:underline text-sm"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleEditProduct(product._id)}
                          className="text-orange-500 hover:underline text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          disabled={deleteLoading[product._id]}
                          className="text-red-500 hover:underline text-sm disabled:opacity-50"
                        >
                          {deleteLoading[product._id] ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No products found</p>
              <Link
                to="/seller/create-product"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 inline-block"
              >
                Create Your First Product
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;