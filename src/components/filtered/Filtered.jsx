import { useEffect, useState } from "react";
import "./Filtered.scss";
import axios from "axios";
import ProductDetailModal from "../productModal/ProductDatailModal";
const Filtered = () => {
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios("https://dummyjson.com/products");
      const data = response.data.products;
      setProducts(data);
    } catch (err) {
      setError("Something went wrong. Please try again!, ");
      console.log(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(selectedProduct);
  console.log(products);
  console.log(isLoading);
  console.log(error);

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

  return (
    <section>
      <div className="container">
        <div className="filterHead">
          <h2>Filtered 1</h2>
          <h2>type 2</h2> <h2>type 3</h2>
          <h2>type 4</h2>
        </div>
        <div className="filterBody">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            products.slice(10, 30).map((product) => (
              <div
                key={product.id}
                className="filterCard"
                onClick={() => handleClick(product)}>
                <div className="imgWrapper">
                  <img src={product.thumbnail} alt={product.title} />
                </div>
                <div className="filterText">
                  <h4>{product.title}</h4>
                  <p>{product.description.slice(0, 32)}...</p>
                  <span>Rs. {product.price}$</span>
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
    </section>
  );
};

export default Filtered;
