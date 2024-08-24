import { useAuth } from "../../auth/AuthProvider"
import url from "../../utils/urls";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import dateFormat from "../../utils/dateFormat";
import axios from "axios";
import OrderCart from "../OrderCart";

const Profile = () => {
  const auth = useAuth();
  const user = auth.getUser();
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(true);
  const getOrders = async () => {
    try {
      setLoader(true);
      const response = await axios.get(`${url.backend}/purchases/user/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.getAccessToken()}`
          }
        }
      );
      setLoader(false);
      setOrders(response.data.docs);
    } catch (error) {
      console.log(error);
    }
  }
  
  
  useEffect(() => {
    window.scrollTo(0, 0);
    if(auth.isAuthenticated) {
      getOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if(!auth.isAuthenticated) {
    return <Navigate to="/" />
  }
  return (
    <div className="flex flex-col justify-center items-center p-8 gap-8">
      <h1 className="text-3xl font-bold">User Profile</h1>
      <div className="flex flex-col justify-center items-center">
        <div className="w-32 h-32 rounded-full">
          <img className="w-full h-full object-cover rounded-full hover:scale-[2] transition-transform duration-300" src={url.backend+"/"+(user.image?user.image:"uploads/JoneDoe.png")} alt={user.name+" profile picture"} />
        </div>
        <h2 className="text-2xl">{user.name} {user.lastName}</h2>
        <p>Joined at: {dateFormat(user.createdAt)}</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold">Order History</h2>
        <div className="relative flex flex-col p-4 w-full max-h-72 overflow-y-auto">
          {orders.length > 0 && !loader && orders.map((order) => <OrderCart key={order._id} purchase={order} />)}
          {orders.length === 0 && !loader && <p>No orders yet</p>}
          {loader && <Loading />}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <h2 className="text-3xl font-bold">Account Settings</h2>
        <div className="flex justify-center items-center gap-2 p-4">
          <Link to="/profile/edit">
            <img className="min-h-16 min-w-16 bg-white p-4 rounded-2xl" src="/svg/account.svg" alt="account" />
          </Link>
          <span className="text-xl p-4">Profile Information</span>
          <Link className="p-2" to="/profile/edit">
            <img src="/svg/rightArrow.svg" alt="" />
          </Link>
        </div>
      </div>
      <button className="text-2xl bg-red-500 rounded-2xl px-4 py-2 hover:text-[#f2e0c2] transition duration-300 hover:scale-105 " onClick={async () => auth.logout(auth.getRefreshToken())}>Log Out</button>
    </div>
  )
}


export default Profile