/* eslint-disable react/prop-types */
import { IoClose } from "react-icons/io5";
import "./ProductDetailModal.scss";

const ProductDetailModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>
          <IoClose size={32} color="rgb(173, 83, 201)" />
        </button>{" "}
        <div className="cardBody">
          {product.images.map((img, i) => (
            <div className="cardImg" key={i}>
              <img src={img} alt="img" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
