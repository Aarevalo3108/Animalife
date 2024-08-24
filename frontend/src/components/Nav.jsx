import { useAuth } from "../auth/AuthProvider"
import { useCart } from "./cartProvider";
import url from "../utils/urls";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ShoppingCart from "./ShoppingCart";

const Nav = () => {
  const [showCart, setShowCart] = useState(false);
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
    setCartItems(getCartItems());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <nav className="bg-repeat bg-[url('../public/svg/NavBar.svg')] flex items-center justify-center md:justify-between  p-4 sticky top-0 z-50">
      <img className="h-8 w-8 absolute left-4 md:hidden" src="/svg/Lines.svg" alt="lines" />
      <Link to="/" className="flex items-center gap-2">
        <img className="h-10 w-10 hover:scale-110 transition-transform duration-300" src="/svg/cat.svg" alt="" />
        <span className="text-3xl hidden md:block hover:scale-110 transition-transform duration-300">Animalife</span>
      </Link>
      <div className="flex gap-4">
        <Link className="text-2xl hover:text-[#f2e0c2] transition-colors duration-300" to="/">Home</Link>
        <Link className="text-2xl hover:text-[#f2e0c2] transition-colors duration-300" to="/shop">Shop</Link>
        <button className="relative text-2xl hover:text-[#f2e0c2] transition-colors duration-300" onClick={() => setShowCart(!showCart)}>
          {cartItems > 0 && <span className="text-[12px] flex items-center justify-center absolute -top-2 -right-3 w-5 h-5 rounded-full bg-red-500">{cartItems}</span>}
          <img className="h-6 w-6" src="/svg/shopping-cart.svg" alt="shopping-cart" />
        </button>
        {!auth.isAuthenticated ?
        <>
          <Link className="text-2xl hover:text-[#f2e0c2] transition-colors duration-300" to="/login">Login</Link>
          <Link className="text-2xl hover:text-[#f2e0c2] transition-colors duration-300"  to="/signup">Sign Up</Link>
        </> :
        <Link to="/profile" className="flex gap-2 text-2xl hover:text-[#f2e0c2] transition-colors duration-300">
          <span>Profile</span><div className="w-8 h-8 rounded-full relative">
            <img className="h-full w-full object-cover rounded-full" src={url.backend+"/"+(user.image?user.image:"uploads/JoneDoe.png")} alt={user.name+" profile picture"} />
          </div>
        </Link>}
      </div>
      <ShoppingCart className={showCart ? " " : "translate-y-[-500%]"} enableRender={showCart}/>
    </nav>
  )
}

export default Nav