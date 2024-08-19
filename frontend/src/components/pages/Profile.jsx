import { useAuth } from "../../auth/AuthProvider"
import url from "../../utils/urls";
import { Link } from "react-router-dom";
import dateFormat from "../../utils/dateFormat";

const Profile = () => {
  const auth = useAuth();
  const user = auth.getUser();
  console.log(user);
  return (
    <div className="flex flex-col justify-center items-center p-8 gap-8">
      <h1 className="text-3xl font-bold">User Profile</h1>
      <div className="flex flex-col justify-center items-center">
        <div className="w-32 h-32 rounded-full">
          <img className="w-full h-full object-cover rounded-full" src={url.backend+"/"+(user.image?user.image:"uploads/JoneDoe.png")} alt={user.name+" profile picture"} />
        </div>
        <h2 className="text-2xl">{user.name} {user.lastName}</h2>
        <p>Joined at: {dateFormat(user.createdAt)}</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold">Order History</h2>
        <div className="grid grid-cols-1p-4">
          {/* Component */}
          <div className="flex justify-center items-center">
            <Link to="/order?id=123">
              <img className="h-16 w-16 bg-white p-4 rounded-2xl" src="/svg/shopping-cart.svg" alt="Order" />
            </Link>
            <div className="p-4 flex flex-col">
              <h3>Order #12345</h3>
              <p className="text-sm text-[#a38449]">Completed on 15-05-2023</p>
            </div>
            <Link className="p-4" to="/order?id=123">
              <img src="/svg/rightArrow.svg" alt="" />
            </Link>
          </div>
          {/* Component */}
          <div className="flex justify-center items-center">
            <Link to="/order?id=123">
              <img className="h-16 w-16 bg-white p-4 rounded-2xl" src="/svg/shopping-cart.svg" alt="Order" />
            </Link>
            <div className="p-4 flex flex-col">
              <h3>Order #12345</h3>
              <p className="text-sm text-[#a38449]">Completed on 15-05-2023</p>
            </div>
            <Link className="p-4" to="/order?id=123">
              <img src="/svg/rightArrow.svg" alt="" />
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <Link to="/order?id=123">
              <img className="h-16 w-16 bg-white p-4 rounded-2xl" src="/svg/shopping-cart.svg" alt="Order" />
            </Link>
            <div className="p-4 flex flex-col">
              <h3>Order #12345</h3>
              <p className="text-sm text-[#a38449]">Completed on 15-05-2023</p>
            </div>
            <Link className="p-4" to="/order?id=123">
              <img src="/svg/rightArrow.svg" alt="" />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <h2 className="text-3xl font-bold">Account Settings</h2>
        <div className="flex justify-center items-center gap-2 p-4">
          <Link to="/profile/edit">
            <img className="h-16 w-16 bg-white p-4 rounded-2xl" src="/svg/account.svg" alt="account" />
          </Link>
          <span className="text-xl p-4">Profile Information</span>
          <Link className="p-2" to="/profile/edit">
            <img src="/svg/rightArrow.svg" alt="" />
          </Link>
        </div>
      </div>
      <button className="text-2xl bg-red-500 rounded-2xl px-4 py-2 hover:text-[#f2e0c2] transition-colors duration-300" onClick={async () => auth.logout(auth.getRefreshToken())}>Log Out</button>
    </div>
  )
}


export default Profile