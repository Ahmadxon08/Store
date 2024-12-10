/* eslint-disable react/prop-types */
import { useState } from "react";
import { useProducts } from "../../context/useContext";
import ProductImages from "../tab/ProductImages";
import { IconButton } from "@mui/material";
import { BsBagPlus } from "react-icons/bs";

const FiteredCard = ({ item, handleClick, subtitle, title }) => {
  const [isAdded, setIsAdded] = useState(false);
  console.log(isAdded);

  const {
    handleAddCart,
    count,
    isInCart,
    setCount,
    notifyForSuccess,
    handleRemoveCart,
  } = useProducts();
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
    notifyForSuccess();
  };
  return (
    <li key={item._id} className="box" onClick={() => handleClick(item)}>
      <ProductImages product={item} />

      <div className="boxText">
        <h3>{subtitle}</h3>
        <span>{title}</span>

        <div className="btnBody" onClick={(e) => e.stopPropagation()}>
          <span>
            {item.price
              .toLocaleString("uz-UZ", {
                style: "decimal",
              })
              .replace(/[^\d,]/g, "")}
            so&#39;m
          </span>{" "}
          <div className="btnCart">
            {isInCart(item._id) === 0 ? (
              <IconButton onClick={handleAddToCart}>
                <BsBagPlus />
              </IconButton>
            ) : (
              <div className="btns">
                <button onClick={handleIncrement}>+</button>
                <span>{isInCart(item._id)}</span>

                <button
                  onClick={handleDecrement}
                  disabled={isInCart(item._id) === 0}>
                  -
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default FiteredCard;
