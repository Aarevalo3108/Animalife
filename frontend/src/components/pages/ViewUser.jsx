/*

userInfo:{
			"_id": "66c162b85b8d1396d2767465",
			"name": "Angel",
			"lastName": "Arevalo",
			"phone": "584121231234",
			"image": "uploads\\users\\66c162b85b8d1396d2767465\\1724477776433-WIN_20240710_20_16_46_Pro.jpg",
			"email": "angelarevalo480@gmail.com",
			"password": "$2b$10$KTf9HRxFNHKKOtaeCUB2gOayk6p3VZcUK7mSNl5b8cJnRw8LhdEGK",
			"role": "6691ee402d2086c57bdb5c96",
			"cart": [],
			"purchases": [],
			"deletedAt": null,
			"deleted": false,
			"createdAt": "2024-08-18T02:55:52.949Z",
			"updatedAt": "2024-08-25T02:29:56.552Z",
}

*/

import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider"
import { useState, useEffect } from "react";
import colors from "../../utils/colors";
import axios from "axios";
import url from "../../utils/urls";
import { useNavigate, Navigate, Link } from "react-router-dom";
import FileUpload from "../FileUpload";
import OrderCart from "../OrderCart";


const ViewUser = () => {
  const auth = useAuth();
  const goTo = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [purchases, setPurchases] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [image, setImage] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Error: Passwords do not match");
      return;
    }
    const form = e.target;
    form.style.opacity = 0.5;
    try {
      setError("");
      const data = {
        name: user.name,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        password: password,
        role: role,
        deleted: user.deleted,
      }
      if(!password){
        delete data.password;
      }
      const response = await axios.patch(`${url.backend}/users/${user._id}`, data,
        {
          headers: {
            "Authorization": `Bearer ${auth.getAccessToken()}`
          },
        }
      );
      if (response.status === 200) {
        console.log("Edit successful");
        form.style.opacity = 1;
        window.scrollTo(0, 0);
      }

    } catch (error) {
      setError(`Error[${error.response.status}]: ${error.response.data.message}`);
      console.log(error);
    }
    form.style.opacity = 1;
  }

  const getUser = async () => {
    try {
      const response = await axios.get(`${url.backend}/users/${id}`, {
        headers: {
          "Authorization": `Bearer ${auth.getAccessToken()}`
        },
      });
      if (response.status === 200) {
        setUser(response.data.docs[0]);
        getPurchases();
        getRoles(response.data.docs[0].role);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getPurchases = async () => {
    try {
      const response = await axios.get(`${url.backend}/purchases/user/${id}`, {
        headers: {
          "Authorization": `Bearer ${auth.getAccessToken()}`
        },
      });
      if (response.status === 200) {
        setPurchases(response.data.docs);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const getRoles = async (userRole) => {
    try {
      const response = await axios.get(`${url.backend}/roles`, {
        headers: {
          "Authorization": `Bearer ${auth.getAccessToken()}`,
          "Role": `${auth.getUser().role}`,
        },
      });
      if (response.status === 200) {
        setRoles(response.data.docs);
        response.data.docs.map((role) => {
          if (userRole === role._id) {
            setRole(role.name);
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(!auth.isAuthenticated) {
    return <Navigate to="/"/>
  }


  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center gap-4 p-8">
      <h1 className="text-3xl flex gap-2 items-center">
        <Link to="/admin/users"><img className="h-6 w-6" src="/svg/leftArrow.svg" alt="Go Back" /></Link>
        User Details
      </h1>
      <div className="w-40 h-40 rounded-full relative">
        <img className="h-full w-full object-cover rounded-full hover:opacity-75 hover:cursor-pointer" src={url.backend+"/"+(user.image?user.image:"uploads/JoneDoe.png")} alt={user.name+" profile picture"} />
        <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full hover:opacity-75 hover:cursor-pointer" onClick={() => setImage(!image)}>
          <img src="/svg/edit.svg" alt="Edit" />
        </button>
      </div>
      {image &&
        <FileUpload id={user._id}/>
      }
      {error && <p className="text-red-500">{error}</p>}
      {user && <>
      <div className="grid gap-4">
        <form className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-4 md:w-[300px] lg:w-[500px]" onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold place-self-center">ID: {user._id}</h2>
          <label className="flex flex-col w-full">Name:
            <input className="px-4 py-2 rounded-lg" type="text" id="name" name="name" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} />
          </label>
          <label className="flex flex-col w-full">Last Name:
            <input className="px-4 py-2 rounded-lg" type="text" id="lastName" name="lastName" value={user.lastName} onChange={(e) => setUser({...user, lastName: e.target.value})} />
          </label>
          <label className="flex flex-col w-full">
            Phone:
            <input className="px-4 py-2 rounded-lg" type="text" id="phone" name="phone" value={user.phone} onChange={(e) => setUser({...user, phone: e.target.value})} />
          </label>
          <label className="flex flex-col w-full">
            Email:
            <input className="px-4 py-2 rounded-lg" type="text" id="email" name="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} />
          </label>
          <label className="flex flex-col w-full w-full">
            Password:
            <input className="px-4 py-2 rounded-lg" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep the same"/>
          </label>
          {password && <label className="flex flex-col w-full">
            Confirm Password:
            <input className="px-4 py-2 rounded-lg" type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </label>}
          <label className="flex items-center gap-4 w-full">
            Active:
            <input disabled={auth.getUser()._id === user._id} className="px-4 py-2 rounded-lg w-4 h-4" type="checkbox" id="deleted" name="deleted" checked={!user.deleted} onChange={(e) => setUser({...user, deleted: !e.target.checked})} />
          </label>
          <label className="flex items-center gap-4 w-full">
            Role:
            {roles.length > 0 &&
              <select disabled={roles.length === 1 || auth.getUser()._id === user._id} className="px-2 py-1 rounded-lg" id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
                {roles.map((role) => <option key={role._id} value={role.name}>{role.name}</option>)}
              </select>
            }
          </label>
          <div className="flex gap-4 p-4">
            <button className={"col-span-2 self-center cursor-pointer w-32 bg-["+colors.n2+"] text-["+colors.n5+"] p-2 rounded-xl hover:bg-["+colors.n5+"] hover:text-["+colors.n1+"] hover:scale-105 transition duration-150"} onClick={() => goTo("/admin/users")}>Cancel</button>
            <input type="submit" value="Save" className={"col-span-2 self-center cursor-pointer w-32 bg-["+colors.n5+"] text-["+colors.n1+"] p-2 rounded-xl hover:bg-["+colors.n2+"] hover:text-["+colors.n5+"] hover:scale-105 transition duration-150"}/>
          </div>
        </form>
        {purchases.length > 0 ?
          <div className="grid gap-4">
            <h2 className="text-lg">Purchases: </h2>
            <div className={"grid max-h-64 border-2 border-["+colors.n5+"] overflow-y-auto bg-["+colors.n1+"] px-4 py-2 rounded-lg gap-4"}>
              {purchases.map((purchase) => (
                <OrderCart key={purchase._id} purchase={purchase} isAdmin={true} />
              ))}
            </div>
          </div>
        :
          <h2 className="text-lg">No purchases found.</h2>
        }
      </div>
      <div>
        <h2>Uneditable Info.</h2>
        <p>Created at {user.createdAt}</p>
        <p>Updated at {user.updatedAt ? user.updatedAt : "N/A"}</p>
        <p>Deleted at {user.deletedAt ? user.deletedAt : "N/A"}</p>
      </div>
      </>}
    </div>
  )
}

export default ViewUser