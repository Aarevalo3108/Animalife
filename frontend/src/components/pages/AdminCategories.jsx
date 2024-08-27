import { useState, useEffect } from "react"
import { useAuth } from "../../auth/AuthProvider"
import { Link } from "react-router-dom"
import AddNew from "../AddNew";
import Loading from "../Loading"
import url from "../../utils/urls"
import axios from "axios"
import CategoryAdminCard from "../CategoryAdminCard"

const AdminCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const auth = useAuth()

  const getCategories = async () => {
    try {
    setLoading(true)
    const { data } = await axios.get(`${url.backend}/category`, {
      headers: {
        "Authorization": `Bearer ${auth.getAccessToken()}`,
        "role": `${auth.getUser().role}`,
      },
    })
    setCategories(data.docs)
    setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getCategories()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="grid justify-items-center gap-8 px-4 py-8">
      <h1 className="text-3xl flex items-center gap-4">
        <Link to="/admin">
          <img className="h-8 w-8" src="/svg/leftArrow.svg" alt="Go Back" />
        </Link>
        Categories Panel
      </h1>
      <div className="grid justify-items-center gap-8">
      <div className="flex items-center gap-4">
          <h2 className="text-2xl">Categories</h2>
          <AddNew type="category" />
        </div>
        <div id="categories" className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[50vh]">
          {categories && categories.map((category) => (
            <CategoryAdminCard key={category._id} category={category} />
          ))}
          {loading && <Loading />}
        </div>
      </div>
    </div>
  )
}

export default AdminCategories