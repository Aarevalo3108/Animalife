import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import url from "../../utils/urls";

/*

  Un usuario tiene:

- Nombre
- Apellido
- Teléfono
- Imagen
- Correo
- Contraseña

*/

const SignUp = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  
  const auth = useAuth();
  const goTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Error: Passwords do not match");
      return;
    }

    try {
      // set opacity to 0.5 will charge the button
      const form = e.target;
      form.style.opacity = 0.5;
      setError(null);
      const response = await axios.post(`${url.backend}/users`, {
        name,
        lastName,
        phone,
        email,
        password,
      });
      form.style.opacity = 1;
      if(response.status === 201) {
        goTo("/login");
      }
    } catch (error) {
      const form = e.target;
      form.style.opacity = 1;
      setError(`Error[${error.response.status}]: ${error.response.data.message}`);
      console.log(error);
    }
  }
  if(auth.isAuthenticated) {
    return <Navigate to="/" />
  }
  return (
  <div className="bg-[url('/Animalife.jpeg')] bg-cover bg-center min-h-[85vh]">
    <div className="bg-[rgba(0,0,0,0.6)] min-h-[85vh] p-8 flex flex-col items-center justify-center">
      <div className="flex flex-col bg-[#fcf8f0] rounded-xl">
        <div className="p-4 flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <h2>Create your account</h2>
          {error && <p className="text-red-500 bg-red-100 px-4 py-2 rounded-full">{error}</p>}
          <form className="flex flex-col lg:grid lg:grid-cols-2 lg:justify-items-center gap-4 px-8 py-4" onSubmit={handleSubmit}>
            <label className="flex flex-col">
              First Name:
              <input className="p-2 rounded-xl" type="text" placeholder="Enter your first name" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="flex flex-col">
              Last Name:
              <input className="p-2 rounded-xl" type="text" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>
            <label className="flex flex-col">
              Phone:
              <input className="p-2 rounded-xl" type="text" placeholder="Enter your phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>
            <label className="flex flex-col">
              Email:
              <input className="p-2 rounded-xl" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="flex flex-col">
              Password:
              <input className="p-2 rounded-xl" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label className="flex flex-col">
              Confirm Password:
              <input className="p-2 rounded-xl" type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </label>
            <input type="submit" value="Sign Up" className="col-span-2 self-center cursor-pointer w-32 bg-[#433526] text-[#f2e0c2] p-2 rounded-xl hover:bg-[#e3b771] hover:text-[#433526] hover:scale-105 transition duration-150"/>
          </form>
            <p>Already have an account? <Link to="/login" className="text-[#708c5a] border-b border-[#fcf8f0] hover:border-[#000] transition duration-150">Login</Link></p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default SignUp