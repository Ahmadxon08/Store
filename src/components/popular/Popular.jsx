import axios from "axios";
import "./Popular.scss";
import { useEffect, useState } from "react";

const cube = "./assets/images/cube.png";
const elps = "./assets/images/elips.png";

const Popular = () => {
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setIsLoading(true); // Yuklanayotgan holatni yoqish
    setError(null); // Xatolikni tozalash
    try {
      const response = await axios("https://dummyjson.com/products");
      const data = response.data.products;
      setProducts(data);
    } catch (err) {
      setError("Something went wrong. Please try again!, ");
      console.log(err);
      setError(err);
    } finally {
      setIsLoading(false); // Yuklanayotgan holatni o'chirish
    }
  };

  console.log(error);
  console.log(isLoading);

  console.log(products);

  useEffect(() => {
    fetchProducts();
  }, []);
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
            products.slice(0, 10).map((product) => (
              <div key={product.id} className="product">
                <div className="imgWrapper">
                  <img src={product.thumbnail} alt={product.title} />
                </div>
                <div className="productText">
                  <h4>{product.title}</h4>
                  <p>{product.description.slice(0, 32)}...</p>
                  <span>Rs. {product.price}$</span>
                  <span>Rating: {product.rating}</span>
                  <button>cart</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Popular;