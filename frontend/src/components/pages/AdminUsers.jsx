import { useState, useEffect } from "react"
import { useAuth } from "../../auth/AuthProvider"
import { Link } from "react-router-dom"
import AddNew from "../AddNew";
import Loading from "../Loading"
import url from "../../utils/urls"
import axios from "axios"
import UserAdminCard from "../UserAdminCard"

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const auth = useAuth()

  const getUsers = async () => {
    try {
    setLoading(true)
    const { data } = await axios.get(`${url.backend}/users`, {
      headers: {
        "Authorization": `Bearer ${auth.getAccessToken()}`,
        "Role": `${auth.getUser().role}`,
      },
    })
    setUsers(data.docs)
    setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getUsers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="grid justify-items-center gap-8 px-4 py-8">
      <h1 className="text-3xl flex gap-2 items-center">
        <Link to="/admin">
          <img className="h-8 w-8" src="/svg/leftArrow.svg" alt="Go Back" />
        </Link>
        Users Panel
      </h1>

      <div className="grid justify-items-center gap-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl">Users</h2>
          <AddNew type="user" />
        </div>
        <div id="users" className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[50vh]">
          {users && users.map((user) => (
            <UserAdminCard key={user._id} user={user} />
          ))}
          {loading && <Loading />}
        </div>
      </div>
    </div>
  )
}

export default AdminUsers