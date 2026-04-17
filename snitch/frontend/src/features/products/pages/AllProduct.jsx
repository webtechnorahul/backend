import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProduct from '../hooks/useProduct';

const AllProduct = () => {
  const { products, loading, error, getSellerProducts } = useProduct();

  useEffect(() => {
    getSellerProducts();
  }, []);

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Products</h1>
            <p className="text-sm text-gray-500 mt-1">All products created by your seller account.</p>
          </div>
          <Link
            to="/seller/create-product"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Create new product
          </Link>
        </div>

        {loading && (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-600">Loading products…</div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">{error}</div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600">
            No products found yet. Create your first product.
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product._id} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
              <div className="h-48 w-full overflow-hidden bg-slate-100">
                {product.images?.[0]?.url ? (
                  <img
                    src={product.images[0].url}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-400">No image available</div>
                )}
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold text-slate-900">{product.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>
                <div className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-500">
                  <span className="font-semibold text-slate-900">{product.price.currency} {product.price.amount}</span>
                  <span>{new Date(product.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.images?.map((image) => (
                    <img
                      key={image._id}
                      src={image.url}
                      alt={product.title}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
