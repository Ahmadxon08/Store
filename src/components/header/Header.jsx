import { Link } from "react-router-dom";
import "./Header.scss";
import { RiCloseLargeLine } from "react-icons/ri";
import { useState } from "react";
import Language from "../lang/Language";
import { TfiAlignRight } from "react-icons/tfi";
import { LiaCompressSolid } from "react-icons/lia";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  console.log(isOpen);

  return (
    <header>
      <div className="container">
        <nav>
          <div className="logo">
            <span>
              <LiaCompressSolid size={44} color="#7421b0" />
            </span>
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
