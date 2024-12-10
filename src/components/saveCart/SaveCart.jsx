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
import { BsCheckCircleFill } from "react-icons/bs";
import toast from "react-hot-toast";

const emptyCart = "./assets/images/emptyCart.png";

const SaveCart = () => {
  const { t } = useTranslation();
  const { isDrawerOpen, closeDrawer } = useDrawerStore();

  const [totalPrice, setTotalPrice] = useState(0);
  const { cartItems, getTitle, isInCart, setCartItems, handleDelete } =
    useProducts();

  //////////////////////////////

  const notifyForDeletion = () => {
    toast(t("deleteFromCart"), {
      icon: <BsCheckCircleFill size={32} color="red" />,
      position: "top-center",
      duration: 1000,
      style: {
        width: "auto",
      },
    });
  };

  const handleDeleteItem = (productId) => {
    handleDelete(productId);
    notifyForDeletion();
  };
  const handleIncrement = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  // Tovarning miqdorini kamaytirish
  const handleDecrement = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item._id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
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

  const countItems = cartItems.length;

  const fixedImg = (product) => {
    const imageUrl = `/assets/images/${product.type1}100/${product.photoUrl}.png`;

    return (
      <img
        className="fixed_img"
        src={imageUrl}
        alt={`Product image`}
        width={100}
        height={98}
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
          md: "600px",
          lg: "700px",
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
              {t("itemCount")} {countItems} {t("totalPrice")}
              <span>{totalPrice}</span>
            </h2>
          </div>

          {cartItems.map((item, i) => {
            const { title } = getTitle(item);
            const itemTotalPrice = item.price * item.quantity;

            console.log(itemTotalPrice, "itemm");

            return (
              <div className="cartItem" key={i}>
                <div className="img_container">{fixedImg(item)}</div>
                <div className="text">
                  <p>{title}</p>

                  <div className="cartAction">
                    <div className="btns">
                      <button onClick={() => handleIncrement(item._id)}>
                        +
                      </button>
                      <span>{isInCart(item._id)}</span>

                      <button
                        onClick={() => handleDecrement(item._id)}
                        disabled={isInCart(item._id) === 0}>
                        -
                      </button>
                    </div>
                    <span>{itemTotalPrice} so&#39;m</span>
                  </div>
                </div>

                <div className="btnAndAct">
                  <button onClick={() => handleDeleteItem(item._id)}>
                    <MdDelete size={32} color="#7421b0" />
                  </button>{" "}
                  <span>X{item.quantity}</span>
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
