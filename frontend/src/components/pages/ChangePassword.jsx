import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import url from "../../utils/urls";
import regex from "../../utils/regex";
import axios from "axios";

const ChangePassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const goTo = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!regex.password.test(password)) {
      setError("Password is not valid. Must have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.");
      return;
    }

    try {
      setLoading(true);
    const response = await axios.patch(`${url.backend}/change-password/${token}`, {
        password,
      });
      if (response.status === 200) {
        console.log("Password changed successfully");
        setMessage("Password changed successfully");
        setTimeout(() => {
          goTo("/login");
        }, 3000);
      }
    } catch (error) {
      setError(`Error[${error.response.status}]: ${error.response.data.message}`);
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-[url('/Animalife.jpeg')] bg-cover bg-center min-h-[85vh]">
      <div className="bg-[rgba(0,0,0,0.6)] min-h-[85vh] p-8 flex flex-col items-center justify-center">
        <div className=" flex bg-n6 rounded-xl">
          <div className={"p-4 flex flex-col items-center justify-center gap-2 " + (loading ? "opacity-75" : "")}>
            <h1 className="text-3xl font-bold">Change Password</h1>
            <div className="w-64 text-[#0009] text-sm text-center">Enter your new password</div>
            {message && <div className="text-green-500 bg-green-100 px-4 py-2 rounded-full">{message}</div>}
            {error && <div className="text-red-500 bg-red-100 px-4 py-2 rounded-full">{error}</div>}
            <div className="py-4 flex flex-col gap-4">
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <label>
                  Password:
                  <input className="p-2 rounded-xl w-full" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label>
                  Confirm Password:
                  <input className="p-2 rounded-xl w-full" type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
                <button type="submit" className="w-44 place-self-center bg-n5 text-n1 p-2 rounded-xl hover:bg-n1 hover:text-n5 transition duration-150">Change Password</button>
              </form>
            </div>
          </div>
          <img className="hidden lg:block w-[450px] rounded-xl" src="/Animalife.jpeg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;