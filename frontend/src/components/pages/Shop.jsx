
import { useState, useEffect } from "react";
import Filters from "../Filters.jsx";
import ProductCard from "../ProductCard.jsx";
import axios from "axios";
import url from "../../utils/urls.jsx";
import { useParams } from "react-router-dom";



const Shop = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(useParams().category);
  const [name, setName] = useState("");
  const getProducts = async () => {
    try {
      const response = await axios.get(`${url.backend}/search`, {
        headers: {
          "name": name,
          "category": category
        }
      });
      setProducts(response.data.docs);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts();
  }, [category, name]);

  return (
    <div className="bg-[url(/Animalife.jpeg)] bg-cover bg-center">
      <div className="flex flex-col py-8 h-screen bg-[rgba(0,0,0,0.6)] gap-4">
        <div className="grid grid-cols-1 md:grid-cols-12 justify-items-center align-content-center">
          <Filters className={"md:col-span-3"} category={category} setCategory={setCategory} name={name} setName={setName} />
          <div id="products" className="md:col-span-9 grid md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 p-8 overflow-y-auto h-[80vh]">
            {products && products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
            {products.length === 0 && <p className="md:col-span-9 place-self-center text-xl text-[#f2e0c2]">No products found</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop