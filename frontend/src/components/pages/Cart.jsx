import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../CartProvider"
import { useAuth } from "../../auth/AuthProvider"
import Loading from "../Loading"
import url from "../../utils/urls"
import axios from "axios"


const Cart = () => {
  const auth = useAuth();
  const goTo = useNavigate();
  const { cart, removeItem, addItem, resetCart } = useCart();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dataError, setDataError] = useState("");
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
    setLoader(true);
    try {
      const response = await Promise.all(cart.products.map(async (product) => await getProduct(product)));
      setData(response);
      setTotal(getTotal(response));
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };

  const getTotal = (products) => {
    let total = 0;
    for (let i = 0; i < cart.products.length; i++) {
      total += cart.products[i].quantity * products[i].price;
    }
    return total;
  }

  const ItemHandler = (id, n, limit, quantity) => {
    if(quantity == limit) return;
    addItem({ _id: id, quantity: n });
  }

  const removeItemHandler = (product) => {
    removeItem(product._id);
  }

  const handleBuy = async () => {
    window.scrollTo(0, 0);
    setSuccess(false);
    setLoader(true);
    if(!auth.isAuthenticated){
      goTo("/login");
    }
    try {
      setDataError("");
      console.log(cart.user, cart.products);
      const response = await axios.post(`${url.backend}/purchases`, {
        user: cart.user,
        products: cart.products
      },{
        headers: {
          "Authorization": `Bearer ${auth.getAccessToken()}`
        }
      });
      if(response.status === 201) {
        // remove cart data
        resetCart();
        setSuccess(true);
        setTimeout(() => {
          goTo("/profile");
        }, 5000);
      }
    } catch (error) {
      setDataError(error.response.data.message);
      console.log(error);
    }
    setLoader(false);
  }

  useEffect(() => {
    getAllProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart])

  return (
    <>
    { !success &&
      <div className={"p-4 grid justify-items-center gap-4" + (loader ? "opacity-75" : "")}>
        <h1 className="text-3xl">Cart Details.</h1>
        {dataError && <p className="text-red-500 text-lg">Error: {dataError}!</p>}
        <div className="flex flex-col gap-4 min-h-[300px]">
          {!loader && data && data.length > 0 ? (
            data.map((product, i) => (
            <div key={product._id} className={" relative bg-[#f2f2f2] gap-4 px-4 py-2 rounded-lg grid grid-cols-4 items-center" + (loader ? " opacity-75" : "")}>
              <h2 className="truncate col-span-4">{product.name}</h2>
              <div className="flex flex-col items-center col-span-2 gap-2">
                <img className="min-w-32 w-[20wh] max-w-96 h-[20vh] min-h-32 max-h-96 object-cover" src={url.backend + "/" + product.images[0]} alt={product.name} />
                { cart.products[i] &&
                <div className="w-fit flex justify-center items-center gap-2 bg-[#433526] text-[#f2e0c2] text-sm px-2 rounded-full">
                  <button className=" text-sm  px-2 rounded-full" onClick={() => ItemHandler(product._id, -1, product.quantity, cart.products[i].quantity)}>-</button>
                  <p className="font-bold text-md px-4 py-1 rounded-lg">{cart.products[i].quantity}</p>
                  <button className=" text-sm px-2 rounded-full" onClick={() => ItemHandler(product._id, 1, product.quantity, cart.products[i].quantity)}>+</button>
                </div>
                }
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-sm">Each One</h3>
                <p>${product.price.toFixed(2)}</p>
              </div>
              { cart.products[i] &&
                <div className="flex flex-col gap-1">
                  <h3>Total</h3>
                  <p>${(product.price * cart.products[i].quantity).toFixed(2)}</p>
                </div>
              }
              <button className="absolute top-4 right-4" onClick={() => removeItemHandler(product)}>
                <img className="w-8 h-8 hover:scale-110 fill-blue transition-transform duration-300" src="/svg/trash.svg" alt="trash" />
              </button>
            </div>
          ))
          ) : (
            loader ? <Loading /> : <p className="place-self-center">Cart is empty</p>
          )}
        </div>
        {data.length > 0 &&
          <>
          <h3 className="text-3xl font-bold">
          Total: ${total.toFixed(2)}
          </h3>
          <button className="bg-[#708c5a] text-[#f2e0c2] px-4 py-2 rounded-lg" onClick={handleBuy}>Buy Now</button>
          </>
        }
    </div>
    }
      { success &&
      <div className="grid justify-items-center min-h-[85vh] p-8">
        <img src="/svg/success.svg" alt="success" />
        <h1 className="text-xl place-self-center">Your order has been placed. Thank you for shopping with us!.</h1>
        <div className="flex flex-col gap-2 items-center">
        <h2 className="text-lg">You will be redirected to your profile...</h2>
        <h2 className="text-lg flex items-center gap-2">You will recibe an email shortly.<img className="w-6 h-6" src="/svg/mail.svg" alt="" /></h2>
        </div>
        <Loading/>
      </div>
      }
  </>
  )
}

export default Cart