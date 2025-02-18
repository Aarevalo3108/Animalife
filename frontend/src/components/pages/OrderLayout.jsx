import { useState, useEffect } from "react"
import { useAuth } from "../../auth/AuthProvider"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import ProductOrderCart from "../ProductOrderCart"
import url from "../../utils/urls"
import axios from "axios"


const OrderLayout = () => {

  const { id } = useParams();
  const [order, setOrder] = useState({});
  const goTo = useNavigate();
  const auth = useAuth();

  const getOrder = async () => {
    try {
      const response = await axios.get(`${url.backend}/purchases/${id}`,
        {
          headers: {
            "Authorization": `Bearer ${auth.getAccessToken()}`
          },
        }
      );
      setOrder(response.data.docs[0]);
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

  return (
    <div className="flex flex-col justify-center items-center p-8 gap-8">
      <h1 className="text-lg">Order ID: {id}</h1>
      <h2 className="text-lg">Order Details</h2>
      <h2 className="text-lg">Created on: {new Date(order.createdAt).toLocaleString()}</h2>
      <div className="flex flex-col justify-center items-center gap-4">
        {Object.keys(order).length && order.products.map((product) => (
          <ProductOrderCart key={product._id} product={product} />
        ))}
      </div>
      <h2 className="text-2xl">Total: ${order.total}</h2>
      <button className="bg-n3 text-white p-4 rounded-2xl hover:bg-n2 hover:text-n3 transition duration-300 hover:scale-105" onClick={() => goTo("/profile")}>Go to profile</button>
    </div>
  )
}

export default OrderLayout