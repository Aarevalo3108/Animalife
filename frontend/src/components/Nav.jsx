import { useAuth } from "../auth/AuthProvider"
import url from "../utils/urls";
import { Link } from "react-router-dom";

const Nav = () => {
  const auth = useAuth();
  const user = auth.getUser();
  return (
    <nav className="bg-repeat bg-[url('../public/svg/NavBar.svg')] flex items-center justify-center md:justify-between  p-4 sticky top-0 z-50">
      <img src="/svg/Lines.svg" alt="lines" className="h-8 w-8 absolute left-4 md:hidden" />
      <span className="text-3xl hidden md:block">Animalife</span>
      <div className="flex gap-4">
        <Link className="text-2xl hover:text-[#f2e0c2] transition-colors duration-300" to="/">Home</Link>
        <span className="text-2xl hover:text-[#f2e0c2] transition-colors duration-300 hidden md:block">Shop</span>
        <span className="text-2xl hover:text-[#f2e0c2] transition-colors duration-300 hidden md:block">About</span>
        <span className="text-2xl hover:text-[#f2e0c2] transition-colors duration-300 hidden md:block">Contact</span>
        {!auth.isAuthenticated ?
        <>
          <Link className="text-2xl hover:text-[#f2e0c2] transition-colors duration-300" to="/login">Login</Link>
          <Link className="text-2xl hover:text-[#f2e0c2] transition-colors duration-300"  to="/signup">Sign Up</Link>
        </> :
        <Link to="/profile" className="flex gap-2 text-2xl hover:text-[#f2e0c2] transition-colors duration-300">
          <span>Profile</span><div className="w-8 h-8 rounded-full relative">
            <img className="h-full w-full object-cover rounded-full" src={url.backend+"/"+(user.image?user.image:"uploads/JoneDoe.png")} alt={user.name+" profile picture"} />
          </div>
        </Link>}
      </div>
    </nav>
  )
}

export default Nav