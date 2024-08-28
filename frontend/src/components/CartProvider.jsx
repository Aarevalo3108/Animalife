import { useContext, createContext, useState, useEffect } from "react"
import PropTypes from 'prop-types';

const CartContext = createContext({
  cart: {},
  addItem: () => {},
  removeItem: () => {},
  addUser: () => {},
  resetCart: () => {},
  findQuantity: () => {}
})

const CartProvider = ({children}) => {
  const [cart, setCart] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {user: null, products: []})

  const findQuantity = (id) => {
    const item = cart.products.find(product => product._id === id)
    return item ? item.quantity : 0
  }
  const addUser = (id) => {
    setCart({...cart, user: id})
  }

  const addItem = (item, stock) => {
    const newCartItemNoRepeat = cart.products.find(product => product._id === item._id)
    if (newCartItemNoRepeat) {
      const newCart = {...cart}
      const index = newCart.products.findIndex(product => product._id === item._id)
      if(item.quantity === -1) {
        newCart.products[index].quantity -= 1
      }
      for (let i = 0; i < item.quantity; i++) {
        if(newCart.products[index].quantity >= stock) return
        newCart.products[index].quantity += 1
      }
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
    <CartContext.Provider value={{cart, addItem, removeItem, addUser, resetCart, findQuantity}}>
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