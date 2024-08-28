/*

userInfo:{
  "_id": "66c162b85b8d1396d2767465",
  "name": "Angel",
  "lastName": "Arevalo",
  "phone": "584121231234",
  "image": null,
  "email": "angelarevalo480@gmail.com",
  "role": "6691ee392d2086c57bdb5c94",
  "cart": [],
  "purchases": [],
  "createdAt": "2024-08-18T02:55:52.949Z",
}

*/

import { useAuth } from "../../auth/AuthProvider"
import { useState, useEffect } from "react";
import axios from "axios";
import url from "../../utils/urls";
import FileUpload from "../FileUpload";
import { useNavigate, Navigate } from "react-router-dom";


const EditUser = () => {
  const auth = useAuth();
  const user = auth.getUser();
  const goTo = useNavigate();
  const [image, setImage] = useState(false);
  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.lastName);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
        name,
        lastName,
        phone,
        email,
        password,
      }
      if (!password) {
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
        goTo("/profile");
        window.location.reload();
      }

    } catch (error) {
      setError(`Error[${error.response.status}]: ${error.response.data.message}`);
      console.log(error);
    }
    form.style.opacity = 1;
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if(!auth.isAuthenticated) {
    return <Navigate to="/"/>
  }


  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center gap-4 p-8">
      <h1 className="text-3xl font-bold">Edit User</h1>
      <div className="w-40 h-40 rounded-full relative">
        <img className="h-full w-full object-cover rounded-full hover:opacity-75 hover:cursor-pointer" src={url.backend+"/"+(user.image?user.image:"uploads/JoneDoe.png")} alt={user.name+" profile picture"} />
        <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full hover:opacity-75 hover:cursor-pointer" onClick={() => setImage(!image)}>
          <img src="/svg/edit.svg" alt="Edit" />
        </button>
      </div>
      {image &&
        <FileUpload id={auth.getUser()._id}/>
      }
      {error && <p className="text-red-500">{error}</p>}
      <form className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-4 md:w-[300px] lg:w-[500px]" onSubmit={handleSubmit}>
        <label className="flex flex-col w-full">Name:
          <input className="px-4 py-2 rounded-lg" type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="flex flex-col w-full">Last Name:
          <input className="px-4 py-2 rounded-lg" type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label className="flex flex-col w-full">
          Phone:
          <input className="px-4 py-2 rounded-lg" type="text" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <label className="flex flex-col w-full">
          Email:
          <input className="px-4 py-2 rounded-lg" type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="flex flex-col w-full w-full">
          Password:
          <input className="px-4 py-2 rounded-lg" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep the same"/>
        </label>
        {password && <label className="flex flex-col w-full">
          Confirm Password:
          <input className="px-4 py-2 rounded-lg" type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>}
        <div className="flex gap-4 p-4">
          <button className="col-span-2 self-center cursor-pointer w-32 bg-n2 text-n5 p-2 rounded-xl hover:bg-n5 hover:text-n6 hover:scale-105 transition duration-150" onClick={() => goTo("/profile")}>Cancel</button>
          <input type="submit" value="Save" className="col-span-2 self-center cursor-pointer w-32 bg-n5 text-n6 p-2 rounded-xl hover:bg-n2 hover:text-n5 hover:scale-105 transition duration-150"/>
        </div>
      </form>
    </div>
  )
}

export default EditUser