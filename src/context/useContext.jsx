/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import useLanguageStore from "../components/lang/languageStore";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

// Context yaratish
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { t } = useTranslation();
  const { selectedLanguage } = useLanguageStore();

  const [products, setProducts] = useState([]);
  const [typedProducts, setTypedProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [count, setCount] = useState(0);
  const settings = { theme: "dark", notifications: true };

  const getTitle = (product) => {
    if (selectedLanguage.value === "en") {
      return {
        subtitle: product.subTitleEn,
        title: product.titleEn,
      };
    } else if (selectedLanguage.value === "ru") {
      return {
        subtitle: product.subTitleRu,
        title: product.titleRu,
      };
    } else {
      return {
        subtitle: product.subTitleUz,
        title: product.titleUz,
      };
    }
  };

  // localStorage'dan cartItemsni olish
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCartItems) {
      setCartItems(savedCartItems);
    }
  }, []);

  // cartItems o'zgarganda localStoragega saqlash
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  /////Add to cart function
  const handleAddCart = (item) => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existItem = storedCartItems.find((c) => c._id === item._id);

    if (existItem) {
      const newData = storedCartItems.map((c) =>
        c._id === item._id ? { ...c, quantity: c.quantity + 1 } : c
      );
      localStorage.setItem("cartItems", JSON.stringify(newData));
    } else {
      const newData = [...storedCartItems, { ...item, quantity: 1 }];
      localStorage.setItem("cartItems", JSON.stringify(newData));
    }

    setCartItems(JSON.parse(localStorage.getItem("cartItems")));
  };

  ///////// Remove from cart function

  const handleRemoveCart = (item) => {
    const existItem = cartItems.find((c) => c._id === item._id);

    if (existItem.quantity === 1) {
      const newData = cartItems.filter((c) => c._id !== existItem._id);
      setCartItems(newData);
      localStorage.setItem("cartItems", JSON.stringify(newData));
    } else {
      const newData = cartItems.map((c) =>
        c._id === item._id ? { ...c, quantity: c.quantity - 1 } : c
      );
      setCartItems(newData);
      localStorage.setItem("cartItems", JSON.stringify(newData));
    }
  };

  /////////////////////////////////  Increment for items function

  const handleIncrement = (product) => {
    setCount((prevCount) => prevCount + 1);
    handleAddCart(product);
  };
  const handleDecrement = (product) => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
    handleRemoveCart(product);
  };

  const isInCart = (id) => {
    const item = cartItems.find((c) => c._id === id);
    return item ? item.quantity : 0;
  };
  const handleDelete = (productId) => {
    const newCartItems = cartItems.filter((item) => item._id !== productId);

    setCartItems(newCartItems);

    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
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

  const saveSettings = async (settings) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (settings) {
          resolve(t("succesToCart"));
        } else {
          reject("Failed to save settings");
        }
      }, 200);
    });
  };

  const notifyForSuccess = () =>
    toast.promise(saveSettings(settings), {
      loading: t("saving"),
      success: <b>{t("succesToCart")}</b>,
      error: <b>Could not save.</b>,
      style: {
        width: "auto",
      },
    });

  return (
    <ProductContext.Provider
      value={{
        products,
        handleRemoveCart,
        setCartItems,
        cartItems,
        loading,
        handleIncrement,
        handleDecrement,
        error,
        handleAddCart,
        handleDelete,
        count,
        fetchProductsByType,
        typedProducts,
        setCount,
        isInCart,
        getTitle,
        notifyForSuccess,
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
