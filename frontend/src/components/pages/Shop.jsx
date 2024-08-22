
import { useState, useEffect } from "react";
import Filters from "../Filters.jsx";
import ProductCard from "../ProductCard.jsx";
import axios from "axios";
import url from "../../utils/urls.jsx";
import { useParams } from "react-router-dom";



const Shop = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const response = await axios.get(`${url.backend}/product`);
      setProducts(response.data.docs);
    } catch (error) {
      console.log(error);
    }
  }
  const {category} = useParams();
  console.log(category);
  

  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts();
  }, [])

  return (
    <div className="flex flex-col gap-8 py-8 h-screen">
      <h1 className="text-3xl text-center">Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-12">
        <Filters className={"md:col-span-3"} />
        <div id="products" className="md:col-span-9 grid md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 px-8 overflow-y-scroll h-[80vh]">
          {products && products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Shop