import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuth } from "../../auth/AuthProvider"
import { Navigate } from "react-router-dom"
import ProductOrderCart from "../ProductOrderCart"
import url from "../../utils/urls"
import axios from "axios"


const OrderLayout = () => {

  const { id } = useParams();
  const [order, setOrder] = useState({});
  const auth = useAuth();
  const user = auth.getUser();

  const getOrder = async () => {
    try {
      const response = await axios.get(`${url.backend}/purchases/${id}`);
      setOrder(response.data.docs[0]);
      if(order.user != user._id) {
        return <Navigate to="/profile" />
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (auth.isAuthenticated) {
      getOrder();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

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
    "total": 202,
    "deletedAt": null,
    "deleted": false,
    "createdAt": "2024-08-19T18:45:43.631Z",
    "updatedAt": "2024-08-19T18:45:43.631Z",
    "__v": 0
}
*/

  return (
    <div className="flex flex-col justify-center items-center p-8 gap-8">
      <h1 className="text-lg font-bold">Order ID: {id}</h1>
      <h2 className="text-2xl">Order Details</h2>
      <div className="flex flex-col justify-center items-center gap-4">
        {Object.keys(order).length && order.products.map((product) => (
          <ProductOrderCart key={product._id} obj={product} />
        ))}
      </div>
      <h2 className="text-2xl">Total: ${order.total}</h2>
    </div>
  )
}

export default OrderLayout