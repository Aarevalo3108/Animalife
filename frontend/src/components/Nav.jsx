import { useAuth } from "../auth/AuthProvider"
import { useCart } from "./CartProvider";
import url from "../utils/urls";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ShoppingCart from "./ShoppingCart";

const Nav = ({background}) => {
  const [showCart, setShowCart] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const auth = useAuth();
  const user = auth.getUser();
  const {cart} = useCart();

  const getCartItems = () => {
    let n = 0;
    for (let i = 0; i < cart.products.length; i++) {
      n += cart.products[i].quantity;
    }
    return n
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setCartItems(getCartItems());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <nav className={"bg-repeat flex items-center justify-end gap-4 p-4 sticky top-0 z-50 " + background}>
      <Link to="/" className="flex gap-2 items-center">
        <img className="w-8 h-8 md:h-10 md:w-10 hover:scale-110 transition-transform duration-300" src="/svg/cat.svg" alt="" />
        <span className="text-xl md:text-3xl hover:scale-110 transition-transform duration-300">Animalife</span>
      </Link>
      <button className={"relative text-2xl hover:text-n1 transition-colors duration-300"} onClick={() => setShowCart(!showCart)}>
        {cartItems > 0 && <span className="text-[12px] flex items-center justify-center absolute -top-2 -right-3 w-5 h-5 rounded-full bg-red-500">{cartItems}</span>}
        <img className="h-6 w-6" src="/svg/shopping-cart.svg" alt="shopping-cart" />
      </button>
      <button className="hover:scale-110 transition-transform duration-300 absolute left-4 z-10" onClick={() => setShowPanel(!showPanel)}>
        {showPanel ? <img className="h-8 w-8" src="/svg/close.svg" alt="close" /> : <img className="h-8 w-8" src="/svg/Lines.svg" alt="lines" />}
      </button>
      <div className={"absolute left-0 top-0 gap-4 flex flex-col py-4 px-2 pl-4 bg-[url(/svg/Navbar.svg)] bg-repeat bg-center shadow-xl rounded-lg transition-transform duration-300 " + (showPanel ? "" : " translate-x-[-200%]")}>
        <Link className={"text-xl mt-10 hover:text-n1 transition-colors duration-300"} to="/" onClick={() => setShowPanel(false)}>Home</Link>
        <Link className={"text-xl hover:text-n1 transition-colors duration-300"} to="/shop" onClick={() => setShowPanel(false)}>Shop</Link>
        {!auth.isAuthenticated ?
        <>
          <Link className={"text-xl hover:text-n1 transition-colors duration-300"} to="/login" onClick={() => setShowPanel(false)}>Login</Link>
          <Link className={"text-xl hover:text-n1 transition-colors duration-300"}  to="/signup" onClick={() => setShowPanel(false)}>Sign Up</Link>
        </> :
        <>
        {auth.isAdmin && <Link className={"text-xl hover:text-n1 transition-colors duration-300"} to="/admin" onClick={() => setShowPanel(false)}>Admin</Link>}
        <Link to="/profile" className={"flex gap-2 text-xl hover:text-n1 transition-colors duration-300"} onClick={() => setShowPanel(false)}>
          <span>Profile</span>
          <div className="w-8 h-8 rounded-full">
            <img className="h-full w-full object-cover rounded-full" src={url.backend+"/"+(user.image?user.image:"uploads/JoneDoe.png")} alt={user.name+" profile picture"} />
          </div>
        </Link>
        </>
        }
      </div>
      <ShoppingCart className={showCart ? " " : "translate-y-[-500%]"} showCart={showCart} setShowCart={setShowCart}/>
    </nav>
  )
}

Nav.propTypes = {
  background: PropTypes.string
}

export default Nav