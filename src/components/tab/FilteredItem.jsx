/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import ProductImages from "./ProductImages";
import ProductDetailModal from "../productModal/ProductDatailModal";
import useLanguageStore from "../lang/languageStore";

const FilteredItem = ({ selectedType }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const { selectedLanguage } = useLanguageStore();
  console.log(selectedType);

  const fetchProducts = async (type) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://213.148.31.6:5050/store/onlineStoreProductsByType",
        { type: type.toString() }
      );
      setProducts(res.data);
      console.log(res.data);
    } catch (err) {
      setError("Ma'lumotlarni yuklashda xatolik yuz berdi!");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedType !== "all") {
      fetchProducts(selectedType);
    } else {
      setProducts([]);
    }
  }, [selectedType]);

  const handleClick = (product) => {
    setSelected(product);
  };

  useEffect(() => {
    if (selected) {
      console.log(selected);
    }
  }, [selected]);

  const handleCloseModal = () => {
    setSelected(null);
  };
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selected]);
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
  return (
    <>
      {loading ? (
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : products.length > 0 ? (
        <ul className="boxBody">
          {products.map((item) => {
            const { title, subtitle } = getTitle(item);
            return (
              <li
                key={item._id}
                className="box"
                onClick={() => handleClick(item)}>
                {/* Product Image Component */}
                <ProductImages product={item} />

                {/* Product Info */}
                <div className="boxText">
                  <h3>{subtitle}</h3>
                  <span>{title}</span>
                  <span> Type: {item.type1}</span>
                  <span> Price: {item.price}</span>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No data found.</p>
      )}
      {selected && (
        <ProductDetailModal product={selected} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default FilteredItem;
