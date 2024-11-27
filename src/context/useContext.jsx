/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Context yaratish
const ProductContext = createContext();

// Provider yaratish
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mahsulotlarni API orqali olish
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://213.148.31.6:5050/store/onlineStoreProductsHot",
        {
          type: "hot",
        }
      );
      setProducts(response.data);
    } catch (err) {
      setError("Mahsulotlar yuklab olinmadi");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Mahsulot qo'shish
  const addProduct = async (product) => {
    try {
      const response = await axios.post(
        "https://api.example.com/products",
        product
      );
      setProducts((prevProducts) => [...prevProducts, response.data]);
    } catch (err) {
      setError("Mahsulot qo'shishda xatolik");
      console.log(err);
    }
  };

  // Mahsulot o'chirish
  const removeProduct = async (id) => {
    try {
      await axios.delete(`https://api.example.com/products/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (err) {
      setError("Mahsulotni o'chirishda xatolik");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, addProduct, removeProduct, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook - useProducts
export const useProducts = () => {
  return useContext(ProductContext);
};
