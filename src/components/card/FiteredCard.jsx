/* eslint-disable react/prop-types */
import { useState } from "react";
import { useProducts } from "../../context/useContext";
import ProductImages from "../tab/ProductImages";
import { Button } from "@mui/material";

const FiteredCard = ({ item, handleClick, subtitle, title }) => {
  const [isAdded, setIsAdded] = useState(false);
  console.log(isAdded);

  const { handleAddCart, count, isInCart, setCount, handleRemoveCart } =
    useProducts();
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
    handleAddCart(item);
  };
  const handleDecrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
    handleRemoveCart(item);
  };
  const handleAddToCart = () => {
    setIsAdded(true);
    setCount(1);
    handleAddCart(item);
  };
  return (
    <li key={item._id} className="box" onClick={() => handleClick(item)}>
      <span
        className={`count ${isInCart(item._id) === 0 ? "count_hidden" : ""}`}>
        {isInCart(item._id)}
      </span>
      <ProductImages product={item} />

      {/* Product Info */}
      <div className="boxText">
        <h3>{subtitle}</h3>
        <span>{title}</span>
        <span> Type: {item.type1}</span>
        <span> Price: {item.price}</span>
        <div className="btnBody" onClick={(e) => e.stopPropagation()}>
          {isInCart(item._id) === 0 ? (
            <button className="btn1" onClick={handleAddToCart}>
              Add to Cart
            </button>
          ) : (
            <div className="btns">
              <Button onClick={handleIncrement}>+</Button>
              <Button
                onClick={handleDecrement}
                disabled={isInCart(item._id) === 0}>
                -
              </Button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default FiteredCard;
