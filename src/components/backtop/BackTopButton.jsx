import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./BackTopButton.scss";
import { SlArrowUp } from "react-icons/sl";

const BackTopButton = () => {
  const [visible, setVisible] = useState(false);

  const checkScrollTop = () => {
    if (!visible && window.pageYOffset > 400) {
      setVisible(true);
    } else if (visible && window.pageYOffset <= 400) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [visible]);

  return (
    visible && (
      <motion.button
        className="back-to-top"
        onClick={scrollToTop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}>
        <SlArrowUp size={32} />
      </motion.button>
    )
  );
};

export default BackTopButton;
