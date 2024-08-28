import PropTypes from 'prop-types';
import url from '../utils/urls';
import { Link } from "react-router-dom";
import { useCart } from './CartProvider';
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
  <div className={"grid gap-2 rounded-xl shadow-lg bg-[url(/svg/woodBG.svg)] bg-n1 p-4"}>
    <div className="relative grid">
      <button onClick={handleShoppingCart} title='Add to cart' className={'z-10 top-0 right-0 absolute border-2 border-n5 p-1 rounded-xl hover:bg-n2 hover:scale-105 transition duration-300  place-self-start'}>
        <img src="/svg/shopping-cart.svg" className="w-4 h-4" alt="" />
      </button>
      <Link title={product.name} to={`/shop/product/${product._id}`} className="max-h-[400px] max-w-[400px] place-self-center flex justify-center items-center hover:scale-110 transition-transform">
        <img src={url.backend+"/"+(product.images[0] || "uploads/placeholder.svg")} alt="Product" className="object-cover rounded-lg" />
      </Link>
      {product.quantity === 0 && <div className="absolute text-sm px-2 py-1 rounded-lg top-0 left-0 bg-n5 flex justify-center items-center text-n1 font-bold">Out of stock</div>}
      {product.quantity === 1 && <div className="absolute text-md px-2 py-1 rounded-lg bottom-0 right-0 bg-n2 flex justify-center items-center text-n5 font-bold">Only {product.quantity} left!</div>}
    </div>
    <div className='place-self-start flex flex-col items-start md:flex-row gap-1'>
      <div className="flex gap-1">
        <p className="text-lg font-bold">${(product.price * (1 - product.discount / 100)).toFixed(2)}</p>
        {product.discount > 0 && <p className={"text-sm text-n5 line-through"}>${product.price.toFixed(2)}</p>}
      </div>
      {product.discount > 0 && <p className={"text-lg text-n1 bg-n5 rounded-full px-2"}>-{product.discount}%</p>}
    </div>
    <div className="flex flex-col gap-2">
      <h3 title={product.name} className="text-md line-clamp-2">{product.name}</h3>
      <p title={product.description} className="text-sm line-clamp-3">{product.description}</p>
    </div>
  </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired,
    discount: PropTypes.number.isRequired
  })
}

export default ProductCard