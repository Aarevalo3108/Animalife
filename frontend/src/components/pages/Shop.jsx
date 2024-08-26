
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, name]);

  return (
    <div className="bg-[url(/Animalife.jpeg)] bg-cover bg-center">
      <div className="flex flex-col py-8 min-h-[85vh] bg-[rgba(0,0,0,0.6)] gap-4">
        <div className="relative grid grid-cols-1 md:grid-cols-12 justify-items-center align-content-center">
          <div className="absolute top-[-2rem] left-0">
            <Filters className={""} category={category} setCategory={setCategory} name={name} setName={setName} />
          </div>
          <div id="products" className="p-4 md:col-span-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 overflow-y-auto h-[80vh] min-h-[400px] max-h-[850px] w-full">
            {products && !loading && products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
            {products.length === 0 && !loading && <p className="col-span-2 md:col-span-3 lg:col-span-4 place-self-center text-xl text-[#f2e0c2]">No products found</p>}
            {loading && <Loading />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop