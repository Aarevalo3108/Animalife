import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";
import url from "../utils/urls";
import PropTypes from 'prop-types';


const ProductOrderCart = ({ product}) => {
  const [data, setData] = useState({});
  const auth = useAuth();

  const getProduct = async () => {
    try {
      const response = await axios.get(`${url.backend}/product/${product._id}`, {
        headers: {
          "role": auth.getUser().role || "unknown",
        },
      });
      setData(response.data.docs[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    {data &&
      <div className={"rounded-xl bg-n6 flex items-center shadow-lg gap-4 p-4"}>
        {data.images && <img className="w-36 h-56 hover:scale-125 transition duration-300 object-cover rounded-lg" src={url.backend + "/" + (data.images[0] || "uploads/placeholder.svg")} alt="" />}
        <div className="flex flex-col w-64 md:w-96">
        <h3 className="text-md flex flex-col max-w-32 md:max-w-96 text-ellipsis overflow-hidden">Name: <span className={"text-n5 w-32 md:w-full"}>{data.name}</span></h3>
        <p className="text-sm max-w-32 md:max-w-96 h-16 flex flex-col text-ellipsis overflow-hidden md:w-96 md:h-24">Description: <span className={"text-n5 w-32 md:w-full"}>{data.description}</span></p>
        <p className="text-sm">Quantity: {product.quantity}</p>
        <p className="text-sm">Price at that time: ${product.price}</p>
        <p className="text-sm">Total: ${(product.price * product.quantity).toFixed(2)}</p>
        </div>
      </div>
    }
    </>
  )
}

ProductOrderCart.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
  })
}

export default ProductOrderCart