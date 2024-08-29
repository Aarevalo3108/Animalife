import { useState, useEffect } from "react"
import { useAuth } from "../../auth/AuthProvider"
import { Link } from "react-router-dom"
import AddNew from "../AddNew";
import Loading from "../Loading"
import Paginate from "../Paginate"
import url from "../../utils/urls"
import axios from "axios"
import ProductAdminCard from "../ProductAdminCard"

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [options, setOptions] = useState({})
  const auth = useAuth()

  const getProducts = async () => {
    try {
    setLoading(true)
    const { data } = await axios.get(`${url.backend}/product?page=${page}&sort=deleted`, {
      headers: {
        "Authorization": `Bearer ${auth.getAccessToken()}`,
        "role": auth.getUser().role || "unknown",
      },
    })
    setOptions({
      totalDocs: data.totalDocs,
      totalPages: data.totalPages,
      nextPage: data.nextPage,
      prevPage: data.prevPage,
      hasNextPage: data.hasNextPage,
      hasPrevPage: data.hasPrevPage,
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
  }, [page])
  return (
    <div className="grid justify-items-center gap-8 px-4 py-8">
      <h1 className="text-3xl flex items-center gap-4">
        <Link to="/admin">
          <img className="h-8 w-8" src="/svg/leftArrow.svg" alt="Go Back" />
        </Link>
        Products Panel
      </h1>
      <div className="grid justify-items-center gap-8">
      <div className="flex items-center gap-4">
          <h2 className="text-2xl">All Products</h2>
          <AddNew type="product" />
        </div>
        <div id="products" className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[50vh]">
          {products && products.map((product) => (
            <ProductAdminCard key={product._id} product={product} />
          ))}
          {loading && <Loading />}
        </div>
        <Paginate options={options} setPage={setPage} page={page} />
      </div>
    </div>
  )
}

export default AdminProducts