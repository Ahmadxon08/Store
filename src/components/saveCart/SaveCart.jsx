// import { useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useProducts } from "../../context/useContext";
import { MdDelete } from "react-icons/md";

import "./SaveCart.scss";
import { Button } from "@mui/material";
import { useDrawerStore } from "../../store/useDrawerStore";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const emptyCart = "./assets/images/emptyCart.png";

const SaveCart = () => {
  const { t } = useTranslation();
  const [totalPrice, setTotalPrice] = useState(0);
  const { cartItems, getTitle, handleDelete } = useProducts();

  const handleDeleteItem = (productId) => {
    handleDelete(productId);
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      const price = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      setTotalPrice(price);
    };
    calculateTotalPrice();
  }, [cartItems]);

  console.log(cartItems);

  const { isDrawerOpen, closeDrawer } = useDrawerStore();

  const fixedImg = (product) => {
    const imageUrl = `/assets/images/${product.type1}100/${product.photoUrl}.png`;

    return (
      <img
        className="fixed_img"
        src={imageUrl}
        alt={`Product image`}
        width={70}
        height={50}
        style={{ objectFit: "cover" }}
      />
    );
  };

  const drawerContent = (
    <Box
      sx={{
        width: {
          xs: "100%",
          sm: "400px",
          md: "500px",
          lg: "600px",
        },
        padding: 2,
      }}
      className="cartBody"
      role="presentation"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={closeDrawer}
      inert={isDrawerOpen ? null : "true"}>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <img src={emptyCart} alt="Bo'sh savat" />
          <h3>{t("cartEmptyTitle")}</h3>
          <p>{t("cartEmptyParagraph")}</p>
          <Button variant="contained" onClick={closeDrawer}>
            {t("startShopping")}
          </Button>
        </div>
      ) : (
        <>
          <div className="head">
            <h2>
              Savatdagi tovarlar naxlari{" "}
              <span>
                {totalPrice.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </h2>
          </div>

          {cartItems.map((item, i) => {
            const { title } = getTitle(item);
            return (
              <div className="cartItem" key={i}>
                <div className="img_container">{fixedImg(item)}</div>
                <div className="text">
                  <p>{title}</p>
                </div>
                <div className="btnAndAct">
                  <span>X{item.quantity}</span>
                  <button onClick={() => handleDeleteItem(item._id)}>
                    <MdDelete size={32} color="#7421b0" />
                  </button>{" "}
                </div>
              </div>
            );
          })}
          <div className="buy">
            <Button variant="contained"> {t("buy")}</Button>
          </div>
        </>
      )}
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor="right"
      open={isDrawerOpen}
      onClose={closeDrawer}
      onOpen={() => {}}
      disableEnforceFocus
      disableRestoreFocus
      sx={{ zIndex: 133300 }}>
      {drawerContent}
    </SwipeableDrawer>
  );
};

export default SaveCart;
