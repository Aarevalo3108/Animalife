import { useState, useEffect } from "react"
import { useAuth } from "../../auth/AuthProvider"
import { Link, useParams } from "react-router-dom"
import ProductOrderCart from "../ProductOrderCart"
import url from "../../utils/urls"
import Loading from "../Loading"
import axios from "axios"


const ViewOrder = () => {

  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  const getOrder = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url.backend}/purchases/${id}`,
        {
          headers: {
            "Authorization": `Bearer ${auth.getAccessToken()}`
          },
        }
      );
      setOrder(response.data.docs[0]);
      getUser(response.data.docs[0].user);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const getUser = async (id) => {
    try {
      const response = await axios.get(`${url.backend}/users/${id}`,
        {
          headers: {
            "Authorization": `Bearer ${auth.getAccessToken()}`
          },
        }
      );
      setUser(response.data.docs[0]);
      console.log(response.data.docs[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getOrder();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  /*
  {
    "_id": "66c392d746f36cfec7ed64bb",
    "user": "66c162b85b8d1396d2767465",
    "products": [
        {
            "_id": "6692b556fed81becbaf1973b",
            "quantity": 10
        }
    ],
    "total": 100,
    "deletedAt": null,
    "deleted": false,
    "createdAt": "2024-08-19T18:45:43.631Z",
    "updatedAt": "2024-08-20T02:31:43.678Z",
    "__v": 0
}
  
  */
  return (
    <div className="grid grid-cols-1 justify-items-center p-4 gap-4 min-h-[85vh]">
      {loading ? <Loading /> :
      <>
      <h1 className="text-2xl flex gap-2 items-center">
        <Link to="/admin/orders"><img className="h-6 w-6" src="/svg/leftArrow.svg" alt="Go Back" /></Link>
        Order Details
      </h1>
      <h2 className="text-lg">Order ID: {id}</h2>
      {user &&
      <div className={"p-4 gap-y-4 grid justify-items-center align-content-center md:grid-cols-2 rounded-xl shadow-lg bg-n2"}>
        <img className="h-40 w-40 col-span-2 md:col-span-1 object-cover rounded-full place-self-center shadow-xl" src={url.backend +"/"+ (user.image ? user.image : "uploads/JoneDoe.png")} alt="Order" />
        <div className="flex flex-col justify-center gap-2">
          <h2 className="flex flex-col text-lg">Order made by:
            <span className="text-md">{user.name} {user.lastName}.</span>
          </h2>
          <h2 className="text-lg flex flex-col">
            Email:
            <span className="text-md">{user.email}</span>
          </h2>
        </div>
        <Link to={`/admin/users/${user._id}`} className={"col-span-2 hover:scale-105 transition duration-300  bg-n5 text-n1 px-6 py-1 hover:bg-n2 hover:text-n5 rounded-full"}>View Profile</Link>
      </div>
      }
      <h2 className="text-lg">Created on: {new Date(order.createdAt).toLocaleString()}</h2>
      <div className="flex flex-col justify-center items-center gap-2 shadow-lg">
        {Object.keys(order).length && order.products.map((product) => (
          <ProductOrderCart key={product._id} product={product} />
        ))}
      </div>
      <h2 className="text-2xl">Total: ${order.total.toFixed(2)}</h2>
      </>
      }
    </div>
  )
}

export default ViewOrder