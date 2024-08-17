import ProductCard from "../ProductCard.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
import url from "../../utils/urls";



const Home = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try{
      const response = await axios.get(`${url.backend}/product`);
      console.log(response.data.docs);
      setProducts(response.data.docs);
    }
    catch(error){
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
    <div className="bg-[url('/Animalife.jpeg')] bg-cover bg-center h-[85vh]">
      <div className="flex flex-col items-center justify-center h-full bg-[rgba(0,0,0,0.6)] text-[#f2e0c2] text-center text-4xl lg:gap-32">
        <span className="lg:text-6xl lg:flex lg:gap-[30vw] text-[#f2e0c2]">
          <span>Welcome to</span>
          <h1>Animalife!</h1>
        </span>
        <span className="text-2xl text-[#e4b972]">Your one-stop shop for all pet supplies</span>
      </div>
    </div>
    <div className="flex flex-col justify-center items-center gap-8 p-8">
      <h2 className="text-3xl">Featured Products</h2>
      <div id="products" className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-4">
        {products && products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
    <div className="flex flex-col justify-center items-center gap-8 p-8">
      <h2 className="text-3xl">Categories</h2>
      <div className="grid grid-cols-2 justify-center items-center gap-4">
        <a href="" className="text-xl p-4 bg-[#f2e0c2] rounded-xl shadow-xl hover:scale-125 hover:bg-[#e4b972] transition-all duration-150">Birds</a>
        <a href="" className="text-xl p-4 bg-[#f2e0c2] rounded-xl shadow-xl hover:scale-125 hover:bg-[#e4b972] transition-all duration-150">Cats</a>
        <a href="" className="text-xl p-4 bg-[#f2e0c2] rounded-xl shadow-xl hover:scale-125 hover:bg-[#e4b972] transition-all duration-150">Dogs</a>
        <a href="" className="text-xl p-4 bg-[#f2e0c2] rounded-xl shadow-xl hover:scale-125 hover:bg-[#e4b972] transition-all duration-150">Fish</a>
      </div>
    </div>
    <div className="flex flex-col items-center gap-8 p-8">
      <h2 className="text-3xl">Quick Access</h2>
      <div className="grid grid-cols-2 gap-4 text-start text-xl">
        <a href="" className="flex justify-start gap-2">
          <img src="/shopping-cart.svg" alt="" />
          <span className="font-bold">Shop</span>
        </a>
        <a href="" className="flex justify-start gap-2">
          <img src="/account.svg" alt="" />
          <span className="font-bold">My Account</span>
        </a>
        <a href="" className="flex justify-start gap-2">
          <img src="/orders.svg" alt="" />
          <span className="font-bold">My Orders</span>
        </a>
        <a href="" className="flex justify-start gap-2">
          <img src="/support.svg" alt="" />
          <span className="font-bold">Support</span>
        </a>
      </div>
    </div>
    </>
  )
}

export default Home