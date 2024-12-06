import { Link } from "react-router-dom";
import "./Header.scss";
import { RiCloseLargeLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import Language from "../lang/Language";
import { TfiAlignRight } from "react-icons/tfi";
import { LiaCompressSolid } from "react-icons/lia";
import { useTranslation } from "react-i18next";
import { TiShoppingCart } from "react-icons/ti";
import { IconButton } from "@mui/material";
import { useProducts } from "../../context/useContext";
import { useDrawerStore } from "../../store/useDrawerStore";

const Header = () => {
  const openDrawer = useDrawerStore((state) => state.openDrawer);

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const { t } = useTranslation();
  const { cartItems } = useProducts();
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  console.log("totalQuantity", totalQuantity);

  console.log("header items quantity", cartItems);

  console.log(t("greeting"));

  console.log(isOpen);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className={isScrolled ? "scrolled" : ""}>
      <div className="container">
        <nav>
          <div className="logo">
            <a href="/">
              <LiaCompressSolid size={44} color="#7421b0" />
            </a>
          </div>
          <div className="navbar">
            <div className={`navlist ${isOpen ? "show" : ""}`}>
              <ul>
                <li>
                  <Link>Main Page</Link>
                </li>
                <li>
                  <Link>Telegram</Link>
                </li>
                <li>
                  <Link>Pay</Link>
                </li>
              </ul>
            </div>
            <div className="navfunction">
              <div className="lang">
                <IconButton
                  className="circleButton"
                  color="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openDrawer();
                  }}
                  aria-label="add to shopping cart">
                  {totalQuantity > 0 ? (
                    <span className="badge">{totalQuantity}</span>
                  ) : null}
                  <TiShoppingCart size={32} color="#7421b0" />
                </IconButton>

                <Language />
              </div>
              <button onClick={toggleMenu} className="burger">
                {isOpen ? (
                  <RiCloseLargeLine size={32} />
                ) : (
                  <TfiAlignRight size={32} />
                )}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
