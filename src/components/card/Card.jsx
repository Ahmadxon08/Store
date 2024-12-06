/* eslint-disable react/prop-types */

import { useState } from "react";
import ProductImages from "../tab/ProductImages.jsx";
import { useProducts } from "../../context/useContext.jsx";

const Card = ({ product, subtitle, title, handleClick }) => {
  const [isAdded, setIsAdded] = useState(false);

  const { handleAddCart, count, cartItems, setCount, handleRemoveCart } =
    useProducts();

  console.log(isAdded);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
    handleAddCart(product);
  };
  const handleDecrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
    handleRemoveCart(product);
  };
  const handleAddToCart = () => {
    setIsAdded(true);
    setCount(1);
    handleAddCart(product);
  };
  const isInCart = (id) => {
    const item = cartItems.find((c) => c._id === id);
    return item ? item.quantity : 0;
  };
  console.log(count);

  return (
    <div
      key={product._id}
      className="product"
      onClick={() => handleClick(product)}>
      <span
        className={`count ${
          isInCart(product._id) === 0 ? "count_hidden" : ""
        }`}>
        {isInCart(product._id)}
      </span>
      <ProductImages product={product} />
      <div className="productText">
        <h4>{subtitle}</h4>
        <p>{title}</p>
        <div className="btnBody" onClick={(e) => e.stopPropagation()}>
          {isInCart(product._id) === 0 ? (
            <button className="btn1" onClick={handleAddToCart}>
              Add to Cart
            </button>
          ) : (
            <div className="btns">
              <button onClick={handleIncrement}>+</button>
              <button
                onClick={handleDecrement}
                disabled={isInCart(product._id) === 0}>
                -
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
