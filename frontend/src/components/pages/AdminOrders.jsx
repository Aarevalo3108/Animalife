import { useState, useEffect } from "react"
import { useAuth } from "../../auth/AuthProvider"
import { Link } from "react-router-dom"
import Loading from "../Loading"
import url from "../../utils/urls"
import axios from "axios"
import OrderAdminCard from "../OrderAdminCard"

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const auth = useAuth()

  const getOrders = async () => {
    try {
    setLoading(true)
    const { data } = await axios.get(`${url.backend}/purchases`, {
      headers: {
        "Authorization": `Bearer ${auth.getAccessToken()}`,
        "Role": `${auth.getUser().role}`,
      },
    })
    setOrders(data.docs)
    setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getOrders()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="grid justify-items-center gap-8 px-4 py-8">
      <h1 className="text-3xl flex items-center gap-4">
        <Link to="/admin">
          <img className="h-8 w-8" src="/svg/leftArrow.svg" alt="Go Back" />
        </Link>
        Orders Panel
      </h1>
      <div className="grid justify-items-center gap-8">
        <h2 className="text-2xl">Orders</h2>
        <div id="orders" className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[50vh]">
          {orders && orders.map((orders) => (
            <OrderAdminCard key={orders._id} purchase={orders} />
          ))}
          {loading && <Loading />}
        </div>
      </div>
    </div>
  )
}

export default AdminOrders