
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import url from '../utils/urls';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCart } from './CartProvider';
import { useAuth } from '../auth/AuthProvider';
import Loading from './Loading';

const ShoppingCart = ({ className, showCart, setShowCart }) => {
  const { cart, removeItem, addUser } = useCart();
  const auth = useAuth();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const getProduct = async (product) => {
    try {
      const response = await axios.get(`${url.backend}/product/${product._id}`,
        {
          headers: {
            "role": auth.getUser().role || "unknown",
          }
        }
      );
      return response.data.docs[0];
    } catch (error) {
      console.log(error);
    }
  };
  const getAllProducts = async () => {
    try {
      setLoader(true);
      const response = await Promise.all(cart.products.map(async (product) => await getProduct(product)));
      setLoader(false);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(showCart) {
      getAllProducts();
    }
    else {
      setData([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCart, cart]);
  return (
    <div className={"p-4 grid gap-[0.5rem] w-52 max-h-96 overflow-y-auto border-2 border-n3 border-dashed absolute transform top-20 right-2 bg-[url('/svg/notebook.svg')] rounded-lg transition-all duration-500 ease-in-out " + className}>
      <h2 className="text-lg">* Products:</h2>
      <div className="grid gap-2 min-h-16">
        {data && data.length > 0 ? (
          data.map((product, i) => (
            <div key={product._id} className="flex items-center gap-2 relative">
              <img className="w-12 h-12 rounded-lg hover:scale-125 transition duration-300" src={url.backend + "/" + (product.images && product.images[0] || "uploads/placeholder.svg")} alt="" />
              <p className="text-md w-16 truncate">{product.name}</p>
              <p className="text-md">{cart.products[i] && cart.products[i].quantity}</p>
              <button className="hover:scale-125 transition duration-300" onClick={() => removeItem(product._id)}>
                <img className="w-6 h-6" src="/svg/trash.svg" alt="trash" />
              </button>
            </div>
          ))
        ) : (
          loader ? <Loading /> : <p className="place-self-center">{showCart ? "Cart is empty" : " "}</p>
        )}
      </div>
      <Link className="place-self-center px-2 py-1 rounded-lg border-2 border-n3 bg-n1 hover:bg-n3 hover:text-n1 transition duration-150" to="/cart" onClick={() => {setShowCart(false);addUser(auth.getUser()._id)}}>View Details</Link>
    </div>
  );
};

ShoppingCart.propTypes = {
  className: PropTypes.string,
  showCart: PropTypes.bool,
  setShowCart: PropTypes.func
};

export default ShoppingCart;