import { useContext, createContext, useState, useEffect } from "react"
import { useAuth } from "../auth/AuthProvider";
import PropTypes from 'prop-types';

const CartContext = createContext({
  cart: {},
  addItem: () => {},
  removeItem: () => {},
  addUser: () => {},
  resetCart: () => {}
})

const CartProvider = ({children}) => {
  const auth = useAuth()
  const [cart, setCart] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {user: (auth.isAuthenticated ? auth.getUser()._id : null), products: []})

  const addUser = (id) => {
    setCart({...cart, user: id})
  }

  const addItem = (item) => {
    if(auth.isAuthenticated){
      addUser(auth.getUser()._id);
    }
    const newCartItemNoRepeat = cart.products.find(product => product._id === item._id)
    if (newCartItemNoRepeat) {
      const newCart = {...cart}
      const index = newCart.products.findIndex(product => product._id === item._id)
      newCart.products[index].quantity += item.quantity
      setCart(newCart)
    }
    else {
      const newCart = {...cart}
      newCart.products.push({ _id: item._id, quantity: item.quantity })
      setCart(newCart)
    }
  }

  const removeItem = (id) => {
    const newCart = {...cart}
    const index = newCart.products.findIndex(product => product._id === id)
    newCart.products.splice(index, 1)
    setCart(newCart)
  }

  const resetCart = () => {
    setCart({user: null, products: []})
  }



  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  return (
    <CartContext.Provider value={{cart, addItem, removeItem, addUser, resetCart}}>
      {children}
    </CartContext.Provider>
  )
}

CartProvider.propTypes = {
  children: PropTypes.node
}

export default CartProvider

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext)