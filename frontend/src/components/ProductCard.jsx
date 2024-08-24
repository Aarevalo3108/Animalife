import PropTypes from 'prop-types';
import url from '../utils/urls';
import { Link } from "react-router-dom";
import { useCart } from './cartProvider';
import { useAuth } from '../auth/AuthProvider';

const ProductCard = ({ product }) => {
  const { addItem, addUser } = useCart();
  const { isAuthenticated, getUser } = useAuth();

  const handleShoppingCart = () => {
    addItem({
      _id: product._id,
      quantity: 1}
    );
    if (isAuthenticated) {
      addUser(getUser()._id);
    }
  };


  return (
  <div className="grid gap-2 rounded-xl shadow-lg bg-[#f2e0c2] p-4 max-h-[350px]">
    <div className="relative">
    <button onClick={handleShoppingCart} title='Add to cart' className='z-10 top-0 right-0 absolute border-2 border-[#433526] p-1 rounded-xl hover:bg-[#d8b07e] hover:scale-105 transition duration-300  place-self-start'>
      <img src="/svg/shopping-cart.svg" className="w-4 h-4" alt="" />
    </button>
    <Link title={product.name} to={`/shop/product/${product._id}`} className="flex justify-center items-center hover:scale-110 transition-transform">
      <img src={url.backend+"/"+(product.images[0] || "uploads/placeholder.svg")} alt="Product" className=" w-48 h-48  object-cover rounded-lg" />
    </Link>
    </div>
    <p className="text-lg font-bold place-self-start">${product.price.toFixed(2)}</p>
    <div className="flex flex-col gap-2 max-w-32 md:max-w-48">
      <h3 title={product.name} className="text-md truncate">{product.name}</h3>
      <p title={product.description} className="text-sm line-clamp-2">{product.description}</p>
    </div>
  </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired
  })
}

export default ProductCard