/* eslint-disable react/prop-types */

import { useState } from "react";
import ProductImages from "../tab/ProductImages.jsx";
import { useProducts } from "../../context/useContext.jsx";
import { BsBagPlus } from "react-icons/bs";
import { IconButton } from "@mui/material";

const Card = ({ product, subtitle, title, handleClick }) => {
  const [isAdded, setIsAdded] = useState(false);

  const { handleAddCart, count, isInCart, setCount, handleRemoveCart } =
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
    handleAddCart(product);
  };

  console.log(count);

  return (
    <div
      key={product._id}
      className="product"
      onClick={() => handleClick(product)}>
      <ProductImages product={product} />
      <div className="productText">
        <h4>{subtitle}</h4>
        <p>{title}</p>

        <div className="btnBody" onClick={(e) => e.stopPropagation()}>
          <span>
            {product.price
              .toLocaleString("uz-UZ", {
                style: "decimal",
              })
              .replace(/[^\d,]/g, "")}
            so&#39;m
          </span>{" "}
          <div className="btnCart">
            {isInCart(product._id) === 0 ? (
              <IconButton onClick={handleAddToCart}>
                <BsBagPlus />
              </IconButton>
            ) : (
              <div className="btns">
                <button onClick={handleIncrement}>+</button>
                <span>{isInCart(product._id)}</span>

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
    </div>
  );
};

export default Card;
