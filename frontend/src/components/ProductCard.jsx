import PropTypes from 'prop-types';
import url from '../utils/urls';

const ProductCard = ({ product }) => {
  return (
    <div className="rounded-xl shadow-lg bg-[#f2e0c2] p-4">
    <img src={url.backend+"/"+(product.images[0] || "uploads/placeholder.svg")} alt="Product" className="h-64 w-64 rounded-lg" />
    <div className="p-4 flex flex-col gap-2">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired
  })
}

export default ProductCard