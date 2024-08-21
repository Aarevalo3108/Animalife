import { Link } from "react-router-dom";
import '../public/svg/Navbar.svg';
import React from 'react'
const Navbar = () => {

  return (
    <nav className="bg-repeat bg-navbar flex items-center justify-center md:justify-between  p-4 sticky top-0 z-50">
      <span className="text-3xl hidden md:block">Animalife</span>
      <div className="flex gap-4">
        <Link className="text-2xl hover:text-[#f2e0c2] transition-colors duration-300" to="/">Home</Link>
        <Link className="text-2xl hover:text-[#f2e0c2] transition-colors duration-300 hidden md:block" to="/products">Shop</Link>
        <span className="text-2xl hover:text-[#f2e0c2] transition-colors duration-300 hidden md:block">About</span>
        <span className="text-2xl hover:text-[#f2e0c2] transition-colors duration-300 hidden md:block">Contact</span>
        <>
          <Link className="text-2xl hover:text-[#f2e0c2] transition-colors duration-300" to="/login">Login</Link>
          <Link className="text-2xl hover:text-[#f2e0c2] transition-colors duration-300"  to="/signup">Sign Up</Link>
        </> 
      </div>
    </nav>
  )
}

export default Navbar
