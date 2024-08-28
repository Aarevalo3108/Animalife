import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useCart } from "../CartProvider"
import { useAuth } from "../../auth/AuthProvider"
import Loading from "../Loading"
import ImagesHandler from "../ImagesHandler"
import axios from "axios"
import url from "../../utils/urls"


const Product = () => {
  const { id } = useParams();
  const auth = useAuth();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);

  const checkLimit = async (n) => {
    if (n > (product.quantity - cart.findQuantity(product._id))) {
      setQuantity(product.quantity - cart.findQuantity(product._id))
    } else if (n < 1) {
      setQuantity(1)
    } else {
      setQuantity(n)
    }
  }

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url.backend}/product/${id}`,
        {
          headers: {
            "role": auth.getUser().role || "unknown",
          }
        }
      );
      setProduct(response.data.docs[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddToCart = () => {
    cart.addItem({
      _id: product._id,
      quantity: quantity,
     }, product.quantity);

    setQuantity(1);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-[url('/Animalife.jpeg')] bg-cover bg-center min-h-[85vh]">
      <div className="bg-[rgba(0,0,0,0.6)] min-h-[85vh] p-4 flex flex-col items-center justify-center">
        {loading ? <Loading /> :<div className="grid w-full md:grid-cols-2 justify-items-center gap-4 bg-n1 bg-[url('/svg/woodBG.svg')] rounded-xl p-4 relative">
          <Link to="/shop" className="place-self-start absolute top-4 left-4 bg-n5 text-n2 hover:scale-110 p-2 rounded-xl hover:bg-n2 hover:text-n5 transition duration-150">
            <img className="w-8 h-8" src="/svg/goBack.svg" alt="left-arrow" />
          </Link>
          {product.images && <ImagesHandler images={product.images} className="md:h-96 w-full rounded-xl" />}
          <div className="flex flex-col md:justify-center gap-4 md:gap-8 p-2">
            <h1 className="text-3xl">{product.name}</h1>
            <p className="text-md">Description: {product.description}</p>
            <div>
              {product.discount > 0 && <p className="text-md line-through">Regular Price: ${(product.price).toFixed(2)}</p>}
              <p className="text-lg font-bold flex gap-4 items-center">Price: ${(product.price * (1 - product.discount / 100)).toFixed(2)} {product.discount > 0 && <span className="text-n1 text-sm bg-n5 py-1 px-2 rounded-xl">-{product.discount}%</span>} </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-md">Stock: {product.quantity} {product.quantity === 1 ? "item" : "items"}</p>
              {product.quantity === 1 && <p className="text-md bg-n5 text-n2 p-1 rounded-xl py-2 px-4">Only {product.quantity} left!</p>}
            </div>
            {product.quantity === 0 && <p className="text-md text-red-500">Out of stock</p>}
            <div className="flex items-center w-full gap-4 justify-end">
              <button disabled={quantity === 1} className={"bg-n5 text-n2 h-8 w-8 rounded-full hover:bg-n2 hover:text-n5 transition duration-150" + (quantity === 1 ? " cursor-not-allowed opacity-50" : "")} onClick={() => {if(quantity > 1)setQuantity(quantity - 1)}}>-</button>
              <input type="number" min="1" max={product.quantity - cart.findQuantity(product._id) < 1 ? 1 : product.quantity - cart.findQuantity(product._id)} step="1" placeholder="Quantity" onChange={(e) => checkLimit(e.target.value)} value={quantity} className={"p-2 rounded-xl w-fit text-center flex cursor-default active:outline-none focus:outline-none" + (product.quantity === 0 ? " cursor-not-allowed opacity-50" : "")} />
              <button disabled={quantity >=  (product.quantity - cart.findQuantity(product._id))} className={"bg-n5 text-n2 h-8 w-8 rounded-full hover:bg-n2 hover:text-n5 transition duration-150" + (quantity >=  (product.quantity - cart.findQuantity(product._id)) ? " cursor-not-allowed opacity-50" : "")} onClick={() => {setQuantity(quantity + 1)}}>+</button>
              <button disabled={quantity >  (product.quantity - cart.findQuantity(product._id))} className={"bg-n5 text-n2 p-2 rounded-xl hover:bg-n2 hover:text-n5 transition duration-150" + (quantity >  (product.quantity - cart.findQuantity(product._id)) ? " cursor-not-allowed opacity-50" : "")} onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default Product