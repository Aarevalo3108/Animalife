import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import url from "../../utils/urls"


const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const getData = async () => {
    try {
      const response = await axios.get(`${url.backend}/product/${id}`);
      setProduct(response.data.docs[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
  }, []);

  console.log(product);

  return (
    <div className="bg-[url('/Animalife.jpeg')] bg-cover bg-center min-h-[85vh]">
      <div className="bg-[rgba(0,0,0,0.6)] min-h-[85vh] p-8 flex flex-col items-center justify-center">
        {product.images && <div className="flex items-center justify-center gap-4 bg-[#f2e0c2] rounded-xl p-8">
          <img className="w-[300px] lg:w-[500px] rounded-xl bg-[#e4b972]" src={url.backend + "/" + product.images[0]} alt="" />
          <div className="flex flex-col gap-4 p-8">
            <h1 className="text-3xl">{product.name}</h1>
            <p className="text-md">Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.quantity}</p>
            <div className="flex w-full gap-4 justify-end">
              <input type="number" min="1" max={product.quantity} placeholder="Quantity" className="p-2 rounded-xl w-24" />
              <button className="w-48 bg-[#433526] text-[#e4b972] p-2 rounded-xl hover:bg-[#e4b972] hover:text-[#433526] transition duration-150">Add to Cart</button>
            </div>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default Product