/* eslint-disable react/prop-types */
import { IoClose } from "react-icons/io5";
import "./ProductDetailModal.scss";

const ProductDetailModal = ({ product, onClose }) => {
  if (!product) return null;

  const imageUrls = product.detailUrls
    ? product.detailUrls.map(
        (imageName) => `/assets/images/${product.type1}100/${imageName}.png`
      )
    : [];

  const mainImage = `/assets/images/${product.type1}100/${product.photoUrl}.png`;

  const allImages = [mainImage, ...imageUrls];

  return (
    <div className="modal" onClick={onClose}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>
          <IoClose size={32} color="rgb(173, 83, 201)" />
        </button>
        <div className="cardBody">
          {allImages.map((img, i) => (
            <div className="cardImg" key={i}>
              <img src={img} alt={`Product image ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
