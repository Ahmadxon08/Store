/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Context yaratish
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [typedProducts, setTypedProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [count, setCount] = useState(0);

  const handleAddCart = (item) => {
    const existItem = cartItems.find((c) => c._id === item._id);

    if (existItem) {
      // Agar mahsulot allaqachon savatchada bo'lsa, uning miqdorini oshiring
      const newData = cartItems.map((c) =>
        c._id === item._id ? { ...existItem, quantity: c.quantity + 1 } : c
      );
      setCartItems(newData);

      console.log("cart data", newData);
    } else {
      // Yangi mahsulotni savatchaga qo'shing
      const newdata = [...cartItems, { ...item, quantity: 1 }];

      console.log("new data", newdata);

      setCartItems(newdata);
    }
  };

  const handleRemoveCart = (item) => {
    const existItem = cartItems.find((c) => c._id === item._id);
    console.log("Delete cart item 0", cartItems);

    if (existItem.quantity === 1) {
      const newData = cartItems.filter((c) => c._id !== existItem._id);
      console.log("Delete cart item 1", newData);

      setCartItems(newData);
    } else {
      const newData = cartItems.map((c) =>
        c._id === item._id ? { ...existItem, quantity: c.quantity - 1 } : c
      );
      console.log("Delete cart item 2", newData);

      setCartItems(newData);
    }
  };

  const handleDelete = (productId) => {
    const newCartItems = cartItems.filter((item) => item._id !== productId);
    setCartItems(newCartItems);
  };

  // Mahsulotlarni API orqali olish
  const fetchProductsHot = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://92.223.44.222:5050/store/onlineStoreProductsHot",
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
  const fetchProductsByType = async (type) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://92.223.44.222:5050/store/onlineStoreProductsByType",
        { type: type.toString() }
      );
      setTypedProducts(response.data);
    } catch (err) {
      setError("Mahsulotlar yuklab olinmadi");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Mahsulot o'chirish

  useEffect(() => {
    fetchProductsHot();
  }, []);
  return (
    <ProductContext.Provider
      value={{
        products,
        handleRemoveCart,
        setCartItems,
        cartItems,
        loading,
        error,
        handleAddCart, // handleRemoveCart,
        handleDelete,
        count,
        fetchProductsByType,
        typedProducts,
        setCount,
      }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook - useProducts
// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  return useContext(ProductContext);
};
