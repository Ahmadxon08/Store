/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ProductDetailModal from "../productModal/ProductDatailModal";
import useLanguageStore from "../lang/languageStore";
import { useProducts } from "../../context/useContext";
import FiteredCard from "../card/FiteredCard";

const FilteredItem = ({ selectedType }) => {
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const { selectedLanguage } = useLanguageStore();
  console.log(selectedType);

  const {
    fetchProductsByType,
    error,
    typedProducts,
    setTypedProducts,
    loading,
  } = useProducts();

  useEffect(() => {
    if (selectedType !== "all") {
      fetchProductsByType(selectedType);
    } else {
      setTypedProducts([]);
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
      ) : typedProducts.length > 0 ? (
        <ul className="boxBody">
          {typedProducts.map((item) => {
            const { title, subtitle } = getTitle(item);
            return (
              <FiteredCard
                item={item}
                title={title}
                key={item._id}
                subtitle={subtitle}
                handleClick={handleClick}
              />
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
