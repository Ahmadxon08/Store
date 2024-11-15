import { NavLink } from "react-router-dom";
import "./Header.scss";
import { RiCloseLargeLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  console.log(isOpen);

  return (
    <header>
      <div className="container">
        <nav>
          <div className="logo">
            <span>Logo</span>
          </div>
          <div className="navbar">
            <div className={`navlist ${isOpen ? "show" : ""}`}>
              <ul>
                <li>
                  <NavLink>main page</NavLink>
                </li>
                <li>
                  <NavLink>Telegram</NavLink>
                </li>
                <li>
                  <NavLink>Pay</NavLink>
                </li>
              </ul>
            </div>

            <select name="" id="">
              <option value="">English</option>
              <option value="">Spanish</option>
              <option value="">French</option>
            </select>
            <button onClick={toggleMenu} className="burger">
              {isOpen ? (
                <RiCloseLargeLine size={32} />
              ) : (
                <RxHamburgerMenu color="black" size={32} />
              )}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
