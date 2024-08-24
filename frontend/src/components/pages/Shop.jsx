
import { useState, useEffect } from "react";
import Filters from "../Filters.jsx";
import ProductCard from "../ProductCard.jsx";
import axios from "axios";
import url from "../../utils/urls.jsx";
import { useParams } from "react-router-dom";
import Loading from "../Loading.jsx";



const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(useParams().category);
  const [name, setName] = useState("");
  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url.backend}/search`, {
        headers: {
          "name": name,
          "category": category
        }
      });
      setLoading(false);
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
      <div className="flex flex-col py-8 min-h-[85vh] bg-[rgba(0,0,0,0.6)] gap-4">
        <div className="grid grid-cols-1 md:grid-cols-12 justify-items-center align-content-center">
          <Filters className={"md:col-span-3 hidden lg:flex"} category={category} setCategory={setCategory} name={name} setName={setName} />
          <div id="products" className="p-4 md:col-span-9 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 overflow-y-auto h-[100vh] min-h-[350px] max-h-[750px] w-full">
            {products && !loading && products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
            {products.length === 0 && !loading && <p className="md:col-span-9 place-self-center text-xl text-[#f2e0c2]">No products found</p>}
            {loading && <Loading />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop