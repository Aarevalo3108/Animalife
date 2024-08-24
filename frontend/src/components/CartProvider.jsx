import { useContext, createContext, useState, useEffect } from "react"
import PropTypes from 'prop-types';

const CartContext = createContext({
  cart: {},
  addItem: () => {},
  removeItem: () => {},
  addUser: () => {},
})

/*

  Cart example:

  {
  user: "66c162b85b8d1396d2767465",
    products: [
      {
        _id: "6692b556fed81becbaf1973b",
        quantity: 10
      }
    ],
  }

*/

const CartProvider = ({children}) => {
  const [cart, setCart] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {user: null, products: []})

  const addUser = (id) => {
    setCart({...cart, user: id})
  }

  const addItem = (item) => {
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



  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  return (
    <CartContext.Provider value={{cart, addItem, removeItem, addUser}}>
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