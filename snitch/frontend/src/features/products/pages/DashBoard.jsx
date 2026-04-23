import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useProduct from '../hooks/useProduct';

const DashBoard = () => {
  const navigate = useNavigate();
  const { getSellerProducts, loading } = useProduct();
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
      const products = await getSellerProducts();
      
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
      // In a real app, you'd use a custom hook or API service here
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
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
    } finally {
      setDeleteLoading(prev => ({ ...prev, [productId]: false }));
    }
  };

  return (
    <div className="min-h-screen p-8 space-y-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="flex justify-between items-center">
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter">Seller <span className="text-indigo-500">Dashboard</span></h1>
          <Link
            to="/seller/create-product"
            className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 tracking-widest uppercase"
          >
            + New Product
          </Link>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-200 space-y-2">
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest">Total Products</h2>
            <p className="text-5xl font-black text-gray-900">{stats.totalProducts}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-200 space-y-2">
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest">Revenue (Base)</h2>
            <p className="text-5xl font-black text-green-500">₹{stats.totalRevenue}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-200 space-y-2">
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest">Average Price</h2>
            <p className="text-5xl font-black text-purple-500">₹{stats.avgPrice}</p>
          </div>
        </div>

        {/* Recent Products Table */}
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
          <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Your Products</h2>
            {error && <span className="text-red-400 font-bold text-sm bg-red-400/10 px-4 py-1 rounded-full border border-red-400/20">{error}</span>}
          </div>
          
          {loading ? (
            <div className="p-20 text-center space-y-4">
              <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Loading inventory...</p>
            </div>
          ) : sellerProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs font-black uppercase tracking-widest">
                    <th className="px-8 py-6">Product</th>
                    <th className="px-8 py-6">Base Price</th>
                    <th className="px-8 py-6">Variants</th>
                    <th className="px-8 py-6">Created</th>
                    <th className="px-8 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sellerProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={product.images?.[0]?.url || '/placeholder.jpg'}
                            alt={product.title}
                            className="w-16 h-16 object-cover rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                          />
                          <div>
                            <p className="font-bold text-gray-900 text-lg">{product.title}</p>
                            <p className="text-xs text-gray-500 uppercase font-black">{product.variants?.length || 0} Variant(s)</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 font-bold text-indigo-400">
                        {product.price?.currency} {product.price?.amount}
                      </td>
                      <td className="px-8 py-6">
                        <Link
                          to={`/products/${product._id}/add-variant`}
                          className="text-xs font-black bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1.5 rounded-lg hover:bg-indigo-500 hover:text-white transition-all uppercase tracking-tighter"
                        >
                          + Add Variant
                        </Link>
                      </td>
                      <td className="px-8 py-6 text-sm text-gray-500 font-medium">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-6 text-right space-x-4">
                        <Link
                          to={`/products/${product._id}`}
                          className="text-gray-900 hover:text-indigo-600 font-bold transition-colors"
                        >
                          VIEW
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          disabled={deleteLoading[product._id]}
                          className="text-red-500 hover:text-red-400 font-bold transition-colors disabled:opacity-30"
                        >
                          {deleteLoading[product._id] ? '...' : 'DELETE'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-20 text-center space-y-6">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-3xl">📦</div>
              <p className="text-gray-400 font-medium text-lg">No products found in your inventory.</p>
              <Link
                to="/seller/create-product"
                className="inline-block bg-gray-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-black transition-all shadow-xl shadow-gray-200"
              >
                CREATE YOUR FIRST PRODUCT
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;