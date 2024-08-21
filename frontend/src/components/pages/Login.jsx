import {useState, useEffect} from "react";
import {useAuth} from "../../auth/AuthProvider";
import {Link, Navigate, useNavigate} from "react-router-dom";
import axios from "axios";
import url from "../../utils/urls";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const auth = useAuth();
  const goTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // set opacity to 0.5 will charge the button
      const form = e.target;
      form.style.opacity = 0.5;
      setError("");
      const response = await axios.post(`${url.backend}/login`, {
        email,
        password
      });
      form.style.opacity = 1;
      if(response.status === 200) {
        if(response.data.accessToken && response.data.refreshToken) {
          auth.saveUser(response.data);
          console.log("Login successful");
          goTo("/");
        }
      }

    } catch (error) {
      const form = e.target;
      form.style.opacity = 1;
      setError(`Error[${error.response.status}]: ${error.response.data.message}`);
      console.log(error);
    }

  }

  useEffect(() => {
    if (auth.isAuthenticated) {
      goTo("/");
    }
    window.scrollTo(0, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-[url('/Animalife.jpeg')] bg-cover bg-center min-h-[85vh]">
      <div className="bg-[rgba(0,0,0,0.6)] min-h-[85vh] p-8 flex flex-col items-center justify-center">
        <div className=" flex bg-[#fcf8f0] rounded-xl">
          <div className="p-4 flex flex-col items-center justify-center gap-2">
            <h1 className="text-3xl font-bold">Login</h1>
            <div className="w-64 text-[#0009] text-sm text-justify">Enter your credentials</div>
            {error && <div className="text-red-500 bg-red-100 px-4 py-2 rounded-full">{error}</div>}
            <div className="py-4 flex flex-col gap-4">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <label>
                  Email:
                  <input className="p-2 rounded-xl w-full" type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                  Password:
                  <input className="p-2 rounded-xl w-full" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <div className="flex justify-center">
                  <button type="submit" className="w-32 bg-[#433526] text-[#f2e0c2] p-2 rounded-xl hover:bg-[#f2e0c2] hover:text-[#433526] transition duration-150">Login</button>
                </div>
              </form>
              <p>Forgot your password? <Link to="./reset-password" className="text-[#708c5a] border-b border-[#fcf8f0] hover:border-[#000] transition duration-150">Reset Password</Link></p>
              <p>Don&apos;t have an account? <Link to="./signup" className="text-[#708c5a] border-b border-[#fcf8f0] hover:border-[#000] transition duration-150">Sign Up</Link></p>
            </div>
          </div>
          <img className="hidden lg:block w-[450px] rounded-xl" src="/Animalife.jpeg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Login