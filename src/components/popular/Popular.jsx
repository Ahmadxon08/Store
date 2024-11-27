import "./Popular.scss";
import { useEffect, useState } from "react";
import ProductDetailModal from "../productModal/ProductDatailModal";
import { useProducts } from "../../context/useContext.jsx";
import ProductImages from "../tab/ProductImages.jsx";

const cube = "./assets/images/cube.png";
const elps = "./assets/images/elips.png";
const btmImage = "./assets/images/btm.png";

const Popular = () => {
  const [isLoading] = useState(false);
  const [error] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { products } = useProducts();

  console.log(products);

  // const fetchProducts = async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await axios("https://dummyjson.com/products");
  //     const data = response.data.products;
  //     setProducts(data);
  //   } catch (err) {
  //     setError("Something went wrong. Please try again!, ");
  //     console.log(err);
  //     setError(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // console.log(error);
  // console.log(isLoading);

  console.log(products);
  const handleClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };
  // useEffect(() => {
  //   fetchProducts();
  // }, []);
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
            products.map((product) => (
              <div
                key={product._id}
                className="product"
                onClick={() => handleClick(product)}>
                <ProductImages product={product} />
                <div className="productText">
                  <h4>{product.subTitleEn}</h4>
                  <span>Rs. {product.price}$</span>
                  <button onClick={(e) => e.stopPropagation()}>cart</button>
                </div>
              </div>
            ))
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
