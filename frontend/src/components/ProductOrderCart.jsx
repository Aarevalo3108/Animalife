import axios from "axios";
import { useState, useEffect } from "react";
import url from "../utils/urls";
import PropTypes from 'prop-types';


const ProductOrderCart = (obj) => {
  const [data, setData] = useState({});
  const product = obj.obj

  const getProduct = async () => {
    try {
      const response = await axios.get(`${url.backend}/product/${product._id}`);
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
    <div className="rounded-xl bg-[#fcf8f0] flex items-center gap-4 p-4">
      {data.images && <img className="w-32 h-32 rounded-lg" src={url.backend + "/" + (data.images[0] || "uploads/placeholder.svg")} alt="" />}
      <div className="flex flex-col w-64 md:w-96">
        <h3 className="text-md flex flex-col max-w-32 md:max-w-96 text-ellipsis overflow-hidden">Name: <span className="text-[#433526] w-32 md:w-full">{data.name}</span></h3>
        <p className="text-sm max-w-32 md:max-w-96 h-16 flex flex-col text-ellipsis overflow-hidden md:w-96 md:h-24">Description: <span className="text-[#433526] w-32 md:w-full">{data.description}</span></p>
        <p className="text-sm">Quantity: {product.quantity}</p>
        <p className="text-sm">Price: ${data.price}</p>
        <p className="text-sm">Total: ${(data.price * product.quantity).toFixed(2)}</p>
      </div>
    </div>
  )
}

ProductOrderCart.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired
  })
}

export default ProductOrderCart