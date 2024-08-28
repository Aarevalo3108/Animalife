import { Link } from "react-router-dom";
import { useState } from "react";
import url from "../../utils/urls";
import axios from "axios";


const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      // set opacity to 0.5 will charge the button
      const form = e.target;
      form.style.opacity = 0.5;
      const response = await axios.post(`${url.backend}/reset-password`, { email });
      form.style.opacity = 1;
      if (response.status === 200) {
        console.log(response.data);
        setMessage(response.data.message);
      }

    } catch (error) {
      const form = e.target;
      form.style.opacity = 1;
      console.log(error);
      setMessage(`Error[${error.response.status}]: ${error.response.data.message}`);
    }
  }



  return (
    <div className="bg-[url('/Animalife.jpeg')] bg-cover bg-center min-h-[85vh]">
      <div className="bg-[rgba(0,0,0,0.6)] min-h-[85vh] p-8 flex flex-col items-center justify-center">
        <div className="flex bg-n6 rounded-xl">
          <div className="p-4 flex flex-col items-center justify-center gap-4">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            {message && <p className="text-n4">{message}</p>}
            <div className="py-8 flex flex-col gap-4">
              <form className="flex flex-col gap-4">
                <label>
                  Enter email address:
                  <input className="p-2 rounded-xl w-full" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <p className="w-64 text-[#0009] text-sm text-justify">Enter your email address and we&apos;ll send you a link to reset your password</p>
                <div className="flex w-full justify-center">
                  <button type="submit" className="w-48 bg-n5 text-n1 p-2 rounded-xl hover:bg-n1 hover:text-n5 transition duration-150" onClick={handleSubmit}>Reset Password</button>
                </div>
                <p>Don&apos;t have an account? <Link to="/signup" className="text-n4 border-b border-n6 hover:border-[#000] transition duration-150">Sign Up</Link></p>
              </form>
            </div>
          </div>
          <img className="w-[450px] rounded-xl hidden lg:flex" src="/Animalife.jpeg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;