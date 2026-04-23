import React, { useEffect, useState } from 'react';
import useProduct from '../hooks/useProduct';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaShoppingBag } from 'react-icons/fa';

const AllUserProduct = () => {
  const { products, loading, error, getAllProducts } = useProduct();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home', 'Sports'];

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (products) {
      let filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (selectedCategory !== 'All') {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }

      setFilteredProducts(filtered);
    }
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen p-8 space-y-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <header className="space-y-6 text-center max-w-2xl mx-auto">
          <h1 className="text-6xl font-black text-gray-900 tracking-tighter uppercase">
            New <span className="text-indigo-500">Arrivals</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            Curated premium products from our top sellers. Experience the next generation of shopping.
          </p>
        </header>

        {/* Controls Section */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-6 rounded-3xl border border-gray-200 shadow-2xl">
          <div className="relative w-full md:w-96 group">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-200 overflow-x-auto no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="p-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 hover:bg-gray-100 transition-all relative"
            >
              <FaFilter />
            </button>
          </div>
        </div>

        {/* Loading & Error */}
        {loading && (
          <div className="py-20 text-center">
            <div className="animate-spin h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-6"></div>
            <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-sm">Initializing collection...</p>
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto p-8 bg-red-500/10 border border-red-500/20 rounded-3xl text-center">
            <p className="text-red-400 font-bold mb-4">{error}</p>
            <button onClick={getAllProducts} className="bg-red-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-600 transition-all">Retry</button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 sm:w-full lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <div 
                key={product._id} 
                onClick={() => navigate(`/products/${product._id}`)}
                className="w-56 sm:w-full group relative bg-white rounded border border-gray-600 overflow-hidden hover:border-indigo-500/30 transition-all duration-500 cursor-pointer flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={product.images?.[0]?.url || '/placeholder.jpg'}
                    alt={product.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* {product.variants?.length > 0 && (
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter">
                      {product.variants.length} Variants
                    </div>
                  )} */}
                </div>

                {/* Content Section */}
                <div className=" px-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1 tracking-tight">
                      {product.title}
                    </h3>
                    <div className="rating">
                      <p className="text-yellow-500 text-2xl">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100">
                    <div className="flex flex-col">
                      <span className=" font-black text-indigo-400">
                        {product.price?.currency=="INR"?"₹":"$"} <span className=" text-sm">{product.price?.amount}</span>
                      </span>
                    </div>
                    
                  </div>

                  {/* {product.seller && (
                    <div className="flex items-center gap-0.5">
                      <div className="w-3.5 h-3.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-[10px] font-black text-white">
                        {product.seller.name[0].toUpperCase()}
                      </div>
                      <span className=" w-3.5 h-3.5 text-[10px] font-black text-gray-600 uppercase tracking-widest">{product.seller.name}</span>
                    </div>
                  )} */}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="py-40 text-center space-y-6 bg-gray-50 rounded-3xl border border-gray-200 border-dashed">
            <div className="text-6xl mx-auto opacity-20">🔍</div>
            <p className="text-gray-500 text-xl font-bold">No products found matching your search.</p>
            <button onClick={() => {setSearchTerm(''); setSelectedCategory('All');}} className="text-indigo-600 font-black uppercase tracking-widest text-sm hover:text-indigo-800 transition-colors">
              Reset Collection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUserProduct;