import PropTypes from 'prop-types';
import url from '../utils/urls';
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
  <div className="flex flex-col justify-center items-center rounded-xl shadow-lg bg-[#f2e0c2] p-4 w-[300px]">
    <Link to={`/shop/product/${product._id}`} className="w-full h-full hover:scale-105 transition-transform">
      <img src={url.backend+"/"+(product.images[0] || "uploads/placeholder.svg")} alt="Product" className="h-64 w-64 rounded-lg" />
    </Link>
    <div className="p-4 flex flex-col gap-2">
      <h3 className="text-lg">{product.name}</h3>
      <p className="text-sm max-w-32 md:max-w-96 h-8 flex flex-col text-ellipsis overflow-hidden">{product.description}</p>
      <p className="text-sm">${product.price}</p>
    </div>
  </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired
  })
}

export default ProductCard