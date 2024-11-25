/* eslint-disable react/prop-types */

const ProductImages = ({ product }) => {
  const imageUrl = `/assets/images/${product.type1}100/${product.photoUrl}.png`;

  return (
    <div className="imgWrapper">
      <img src={imageUrl} alt={`Product image`} />
    </div>
  );
};

export default ProductImages;
