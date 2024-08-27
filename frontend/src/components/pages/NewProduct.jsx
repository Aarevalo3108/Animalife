import url from "../../utils/urls"
import regex from "../../utils/regex"
import Loading from "../Loading"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../auth/AuthProvider"
import { useState, useEffect } from "react"
import axios from "axios"


/*

Product data:
{
  "name": string (min: 2, max: 50, match: regex.name),
  "description": string (min: 2, max: 500, match: regex.description),
  "price": number (min: 0, max: 1000000),
  "discount": number (default: 0, optional, min: 0, max: 100),
  "quantity": number (min: 0, max: 1000000),
  "category": string (optional, min: 2, max: 50, match: select from categories),
}

*/

const NewProduct = () => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const [discount, setDiscount] = useState(0)
  const [category, setCategory] = useState("")
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const auth = useAuth()
  const goTo = useNavigate()

  const getCategories = async () => {
    try {
      setError(null)
      setLoading(true)
      const response = await axios.get(`${url.backend}/category`)
      setLoading(false)
      setCategories(response.data.docs)
    } catch (error) {
      setError(`Error[${error.response.status}]: ${error.response.data.message}`)
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    window.scrollTo(0, 0)
    if(!regex.name.test(name)){
      setError("Name is not valid")
      return
    }
    if(!regex.description.test(description)){
      setError("Description is not valid")
      return
    }
    if(!category){
      setError("A category is selected")
      return
    }
    try {
      setLoading(true)
      setError(null)
      const response = await axios.post(`${url.backend}/product`, {
        name,
        description,
        price,
        quantity,
        category,
        discount
      }, {
        headers: {
          "Authorization": `Bearer ${auth.getAccessToken()}`
        }
      })
      if (response.status === 201) {
        console.log("Product created")
        goTo("/admin/product/imgs/" + response.data.docs[0]._id)
      }
    } catch (error) {
      setError(`Error[${error.response.status}]: ${error.response.data.message}`)
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className="grid justify-items-center gap-8 p-8">
      <h1 className="text-2xl">New Product</h1>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <Loading />}
      <form className="grid justify-items-center gap-4" onSubmit={handleSubmit}>
        <label className="grid gap-2" htmlFor="name">
          <span className="after:content-['*'] after:text-red-500 text-lg">Name:</span>
          <input placeholder="Enter product name" autoFocus className={"cursor-pointer p-2 rounded-lg bg-n1"} type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="grid gap-2" htmlFor="description">
          <span className="after:content-['*'] after:text-red-500 text-lg">Description:</span>
          <textarea name="description" rows={5} maxLength={100} className={" cursor-pointer p-2 rounded-lg bg-n1"} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter product description" id="description"></textarea>
        </label>
        <label className="flex items-center justify-center w-full gap-4" htmlFor="price">
          <span className="after:content-['*'] after:text-red-500 text-lg">Price:</span>
          <input className={"cursor-pointer text-end py-2 px-4 rounded-lg bg-n1"} min={0} max={1000000} type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />$15
        </label>
        <label className="flex items-center justify-center w-full gap-4" htmlFor="quantity">
          <span className="after:content-['*'] after:text-red-500 text-lg">Quantity:</span>
          <input className={"cursor-pointer text-end py-2 px-4 rounded-lg bg-n1"} min={0} max={1000000} type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </label>
        <label className="flex items-center justify-center w-full gap-4" htmlFor="discount">
          <span className="text-lg">Discount:</span>
          <input className={"cursor-pointer text-end py-2 px-4 rounded-lg bg-n1"} min={0} max={100} type="number" id="discount" value={discount} onChange={(e) => setDiscount(e.target.value)} />%
        </label>
        <label className="after:content-['*'] after:text-red-500 flex justify-center items-center w-full gap-2" htmlFor="category">
          <span className="text-lg">Category:</span>
          <select className={"cursor-pointer p-2 rounded-lg bg-n1"} id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            {categories && categories.map((category) => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </label>
        <div className="flex gap-4">
          <Link to="/admin/products" className={"py-2 px-4 rounded-lg bg-n5 text-n1 hover:scale-105 transition duration-300 text-lg"}>Cancel</Link>
          <button disabled={loading} onClick={(e) => handleSubmit(e)} className={"py-2 px-4 rounded-lg bg-n4 text-n1 hover:scale-105 transition duration-300 text-lg"}  type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default NewProduct