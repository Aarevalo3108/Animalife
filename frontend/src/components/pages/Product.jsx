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
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const { addItem } = useCart();

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
    addItem({
      _id: product._id,
      quantity: quantity,
     });

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
        <div className="grid w-full md:grid-cols-2 justify-items-center gap-4 bg-n1 bg-[url('/svg/woodBG.svg')] rounded-xl p-4 relative">
          <Link to="/shop" className="place-self-start absolute top-4 left-4 bg-n5 text-n2 hover:scale-110 p-2 rounded-xl hover:bg-n2 hover:text-n5 transition duration-150">
            <img className="w-8 h-8" src="/svg/goBack.svg" alt="left-arrow" />
          </Link>
          {product.images && <ImagesHandler images={product.images} className="h-96 w-64" />}
          <div className="flex flex-col md:justify-center gap-4 md:gap-8 p-2">
            <h1 className="text-3xl">{product.name}</h1>
            <p className="text-md">Description: {product.description}</p>
            <p className="text-md">Price: ${product.price}</p>
            <p className="text-md">Stock: {product.quantity}</p>
            <div className="flex items-center w-full gap-4 justify-end">
              <button className="bg-n5 text-n2 h-8 w-8 rounded-full hover:bg-n2 hover:text-n5 transition duration-150" onClick={() => {if(quantity > 1)setQuantity(quantity - 1)}}>-</button>
              <input type="number" min="1" max={product.quantity} step="1" placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} value={quantity} className="p-2 rounded-xl w-fit text-center" />
              <button className="bg-n5 text-n2 h-8 w-8 rounded-full hover:bg-n2 hover:text-n5 transition duration-150" onClick={() => {if(quantity < product.quantity)setQuantity(quantity + 1)}}>+</button>
              <button className="bg-n5 text-n2 p-2 rounded-xl hover:bg-n2 hover:text-n5 transition duration-150" onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
        {loading && <Loading />}
      </div>
    </div>
  )
}

export default Product