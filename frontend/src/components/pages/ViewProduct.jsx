/*

productInfo:{
			"_id": "66c162b85b8d1396d2767465",
			"name": "Angel",
			"lastName": "Arevalo",
			"phone": "584121231234",
			"image": "uploads\\products\\66c162b85b8d1396d2767465\\1724477776433-WIN_20240710_20_16_46_Pro.jpg",
			"email": "angelarevalo480@gmail.com",
			"password": "$2b$10$KTf9HRxFNHKKOtaeCUB2gOayk6p3VZcUK7mSNl5b8cJnRw8LhdEGK",
			"role": "6691ee402d2086c57bdb5c96",
			"cart": [],
			"purchases": [],
			"deletedAt": null,
			"deleted": false,
			"createdAt": "2024-08-18T02:55:52.949Z",
			"updatedAt": "2024-08-25T02:29:56.552Z",
}

*/

import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider"
import { useState, useEffect } from "react";
import colors from "../../utils/colors";
import axios from "axios";
import url from "../../utils/urls";
import { useNavigate, Navigate, Link } from "react-router-dom";
import ProductUpload from "../ProductUpload";
import ImagesHandler from "../ImagesHandler";


const ViewProduct = () => {
  const auth = useAuth();
  const goTo = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    form.style.opacity = 0.5;
    try {
      setError("");
      if (!product.password) {
        delete product.password;
      }
      const data = {
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        category: category,
        deleted: product.deleted,
      }
      const response = await axios.patch(`${url.backend}/product/${product._id}`, data, {
        headers: {
          "Authorization": `Bearer ${auth.getAccessToken()}`,
          "role": auth.getUser().role || "unknown",
        },
      });
      if (response.status === 200) {
        console.log("Edit successful");
        form.style.opacity = 1;
        window.location.reload();
      }

    } catch (error) {
      setError(`Error[${error.response.status}]: ${error.response.data.message}`);
      console.log(error);
    }
    form.style.opacity = 1;
  }

  const getProduct = async () => {
    try {
      const response = await axios.get(`${url.backend}/product/${id}`, {
        headers: {
          "Authorization": `Bearer ${auth.getAccessToken()}`,
          "role": `${auth.getUser().role || "unknown"}`,
        },
      });
      if (response.status === 200) {
        setProduct(response.data.docs[0]);
        getCategories(response.data.docs[0].category);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const getCategories = async (productCategory) => {
    try {
      const response = await axios.get(`${url.backend}/category`, {
        headers: {
          "Authorization": `Bearer ${auth.getAccessToken()}`
        },
      });
      if (response.status === 200) {
        setCategories(response.data.docs);
        response.data.docs.map((cat) => {
          if (productCategory === cat._id) {
            setCategory(cat.name);
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(!auth.isAuthenticated) {
    return <Navigate to="/"/>
  }

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center gap-4 p-8">
      <h1 className="text-2xl flex gap-2 items-center">
      <Link to="/admin/products"><img className="h-6 w-6" src="/svg/leftArrow.svg" alt="Go Back" /></Link>
        Product Details
      </h1>
      <div className="w-64 rounded-full relative">
        {product.images && <ImagesHandler images={product.images} />}
        <button className="absolute bottom-12 right-4 bg-white p-2 rounded-full hover:opacity-75 hover:cursor-pointer" onClick={() => setImage(!image)}>
          <img src="/svg/edit.svg" alt="Edit" />
        </button>
      </div>
      {image &&
        <ProductUpload id={product._id}/>
      }
      {error && <p className="text-red-500">{error}</p>}
      {product && <>
      <div className="grid gap-4">
        <form className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-4 md:w-[300px] lg:w-[500px]" onSubmit={handleSubmit}>
          <label className="flex flex-col w-full">
            Name:
            <input className="px-4 py-2 rounded-lg" type="text" id="name" name="name" value={product.name} onChange={(e) => setProduct({...product, name: e.target.value})} />
          </label>
          <label className="flex flex-col w-full">
            Description:
            <textarea className="px-4 py-2 rounded-lg max-h-[200px]" id="description" name="description" value={product.description} onChange={(e) => setProduct({...product, description: e.target.value})} />
          </label>
          <label className="flex flex-col w-full">
            Price:
            <input className="px-4 py-2 rounded-lg" type="number" id="price" name="price" value={product.price} onChange={(e) => setProduct({...product, price: e.target.value})} />
          </label>
          <label className="flex flex-col w-full">
            Quantity:
            <input className="px-4 py-2 rounded-lg" type="number" id="quantity" name="quantity" value={product.quantity} onChange={(e) => setProduct({...product, quantity: e.target.value})} />
          </label>
          <label className="flex flex-col w-full">
            Category:
            <select className="px-4 py-2 rounded-lg" id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-4 w-full">
            Active:
            <input className="px-4 py-2 rounded-lg w-4 h-4" type="checkbox" id="deleted" name="deleted" checked={!product.deleted} onChange={(e) => setProduct({...product, deleted: !e.target.checked})} />
          </label>
          <div className="flex gap-4 p-4">
            <button className={"col-span-2 self-center cursor-pointer w-32 bg-["+colors.n2+"] text-["+colors.n5+"] p-2 rounded-xl hover:bg-["+colors.n5+"] hover:text-["+colors.n1+"] hover:scale-105 transition duration-150"} onClick={() => goTo("/admin/products")}>Cancel</button>
            <input type="submit" value="Save" className={"col-span-2 self-center cursor-pointer w-32 bg-["+colors.n5+"] text-["+colors.n1+"] p-2 rounded-xl hover:bg-["+colors.n2+"] hover:text-["+colors.n5+"] hover:scale-105 transition duration-150"}/>
          </div>
        </form>
      </div>
      <div className="grid gap-4">
        <h2 className="text-xl font-bold">Uneditable Info.</h2>
        <p className="text-sm">Created at {product.createdAt}</p>
        <p className="text-sm">Updated at {product.updatedAt ? product.updatedAt : "N/A"}</p>
        <p className="text-sm">Deleted at {product.deletedAt ? product.deletedAt : "N/A"}</p>
      </div>
      </>}
    </div>
  )
}

export default ViewProduct