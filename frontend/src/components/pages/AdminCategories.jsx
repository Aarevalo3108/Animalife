import { useState, useEffect } from "react"
import { useAuth } from "../../auth/AuthProvider"
import { Link } from "react-router-dom"
import Loading from "../Loading"
import Paginate from "../Paginate";
import url from "../../utils/urls"
import axios from "axios"
import CategoryAdminCard from "../CategoryAdminCard"

const AdminCategories = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [options, setOptions] = useState({})
  const [panel, setPanel] = useState(false)
  const [error, setError] = useState(null)
  const auth = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
    setError(null)
    const response = await axios.post(`${url.backend}/category`, { name }, {
      headers: {
        "Authorization": `Bearer ${auth.getAccessToken()}`,
        "role": `${auth.getUser().role}`,
      },
    })
    if(response.status === 201) {
      getCategories()
      setName("")
      setPanel(false)
    }
    } catch (error) {
      setError(`Error[${error.response.status}]: ${error.response.data.message}`)
      console.log(error)
    }
    setLoading(false)
  }
  const getCategories = async () => {
    try {
    setLoading(true)
    const { data } = await axios.get(`${url.backend}/category?sort=-createdAt&page=${page}`, {
      headers: {
        "Authorization": `Bearer ${auth.getAccessToken()}`,
        "role": `${auth.getUser().role}`,
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
  }, [page])
  return (
    <div className="grid justify-items-center gap-8 px-4 py-8">
      <h1 className="text-3xl flex items-center gap-4">
        <Link to="/admin">
          <img className="h-8 w-8" src="/svg/leftArrow.svg" alt="Go Back" />
        </Link>
        Categories Panel
      </h1>
      <div className="grid justify-items-center gap-8">
        <div className="flex items-center gap-4 relative">
          <h2 className="text-2xl">Categories</h2>
          <button className={"p-4 text-lg rounded-full bg-n4 text-n1 py-1 px-2 hover:scale-105 transition duration-300 rounded"} onClick={() => setPanel(!panel)}>Add New</button>
          {panel &&
            <div className="z-20 right-0 top-0 flex p-4 flex-col items-center justify-center bg-n5 gap-4 absolute rounded-xl shadow-xl">
              <h1 className="text-xl bg-n5 text-n1">Add Category</h1>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <input type="text" name="name" id="name" placeholder="Enter name" className="p-2 rounded-xl shadow-xl w-24" onChange={(e) => setName(e.target.value)} />
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 text-lg bg-n3 text-n1 py-1 px-2 hover:scale-105 transition duration-300 rounded" onClick={() => setPanel(false)}>Cancel</button>
                <button className="p-4 text-lg bg-n4 text-n1 py-1 px-2 hover:scale-105 transition duration-300 rounded" onClick={handleSubmit}>Add</button>
              </div>
            </div>}
        </div>
        <div id="categories" className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[50vh]">
          {categories && categories.map((category) => (
            <CategoryAdminCard key={category._id} category={category} />
          ))}
          {loading && <Loading />}
        </div>
        <Paginate options={options} setPage={setPage} page={page} />
      </div>
    </div>
  )
}

export default AdminCategories