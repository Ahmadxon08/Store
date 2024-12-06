import "./Popular.scss";
import { useEffect, useState } from "react";
import ProductDetailModal from "../productModal/ProductDatailModal";
import { useProducts } from "../../context/useContext.jsx";
import useLanguageStore from "../lang/languageStore.js";
import Card from "../card/Card.jsx";

const cube = "./assets/images/cube.png";
const elps = "./assets/images/elips.png";
const btmImage = "./assets/images/btm.png";

const Popular = () => {
  const [isLoading] = useState(false);
  const [error] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { selectedLanguage } = useLanguageStore();

  console.log(selectedLanguage);

  const { products } = useProducts();

  const handleClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProduct]);

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
    <section>
      <div className="imgs">
        <img src={cube} alt="" className="cube" />
        <img src={elps} alt="" className="elps" />
      </div>

      <div className="container">
        <div className="popularHead">
          <h2>
            Popular <span>Products</span>
          </h2>
          <h3>
            The best <span>selling</span> products
          </h3>
        </div>
        <div className="pupularBody">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            products.map((product) => {
              const { subtitle, title } = getTitle(product);

              return (
                <Card
                  key={product._id}
                  subtitle={subtitle}
                  title={title}
                  product={product}
                  handleClick={handleClick}
                />
              );
            })
          )}
        </div>
      </div>
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
      <div className="btmImage">
        <img src={btmImage} alt="" />
      </div>
    </section>
  );
};

export default Popular;
