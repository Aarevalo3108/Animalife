import { useState, useEffect } from "react"
import { useAuth } from "../../auth/AuthProvider"
import { Link } from "react-router-dom"
import Loading from "../Loading"
import url from "../../utils/urls"
import axios from "axios"
import ProductAdminCard from "../ProductAdminCard"

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const auth = useAuth()

  const getProducts = async () => {
    try {
    setLoading(true)
    const { data } = await axios.get(`${url.backend}/product`, {
      headers: {
        "Authorization": `Bearer ${auth.getAccessToken()}`,
        "Role": `${auth.getUser().role}`,
      },
    })
    setProducts(data.docs)
    setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getProducts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="grid justify-items-center gap-8 px-4 py-8">
      <h1 className="text-3xl flex items-center gap-4">
        <Link to="/admin">
          <img className="h-8 w-8" src="/svg/leftArrow.svg" alt="Go Back" />
        </Link>
        Products Panel
      </h1>
      <div className="grid justify-items-center gap-8">
        <h2 className="text-2xl">Products</h2>
        <div id="products" className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[50vh]">
          {products && products.map((product) => (
            <ProductAdminCard key={product._id} product={product} />
          ))}
          {loading && <Loading />}
        </div>
      </div>
    </div>
  )
}

export default AdminProducts