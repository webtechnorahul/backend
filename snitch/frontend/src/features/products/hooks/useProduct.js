import { useDispatch, useSelector } from "react-redux";
import { setProducts, addProduct, setCreatedProduct, setLoading, setError, clearError } from "../state/product.slice";
import { createProductAPI, getSellerProductsAPI, getAllProductsAPI,getProductByIdAPI } from "../services/product.api.js";

const useProduct = () => {
  const dispatch = useDispatch();
  const { products, loading, error, createdProduct } = useSelector((state) => state.product);

  // Create a new product
  const createProduct = async ({ title, description, priceAmount, priceCurrency, images }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await createProductAPI({ title, description, priceAmount, priceCurrency, images });

      dispatch(setCreatedProduct(response.product));
      dispatch(addProduct(response.product)); // Add to products list
      return response.product;
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Get seller's products
  const getSellerProducts = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await getSellerProductsAPI();

      dispatch(setProducts(response.products));
      return response.products;
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Get all products for users
  const getAllProducts = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await getAllProductsAPI();

      dispatch(setProducts(response.products));
      return response.products;
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // get product details by id
    const getProductById = async (productId) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const response = await getProductByIdAPI(productId);
      return response.product;
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };


  // Clear error
  const clearProductError = () => {
    dispatch(clearError());
  };

  return {
    products,
    loading,
    error,
    createdProduct,
    createProduct,
    getSellerProducts,
    getAllProducts,
    clearProductError,
    getProductById
  };
};

export default useProduct;