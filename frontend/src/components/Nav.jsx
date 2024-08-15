import Lines from "../assets/svg/lines.svg"
const Nav = () => {
  return (
    <nav className="bg-repeat bg-navbar flex items-center justify-center md:justify-between  p-4 sticky top-0">
      <img src={Lines} alt="lines" className="h-8 w-8 absolute left-4 md:hidden" />
      <span className="text-3xl hidden md:block">Animalife</span>
      <div className="flex gap-4">
        <a className="text-2xl hover:text-[#f2e0c2] transition-colors duration-300" href="./">Home</a>
        <span className="text-2xl hover:text-[#f2e0c2] transition-colors duration-300 hidden md:block">Shop</span>
        <span className="text-2xl hover:text-[#f2e0c2] transition-colors duration-300 hidden md:block">About</span>
        <span className="text-2xl hover:text-[#f2e0c2] transition-colors duration-300 hidden md:block">Contact</span>
        <a className="text-2xl hover:text-[#f2e0c2] transition-colors duration-300" href="./login">Login</a>
        <a className="text-2xl hover:text-[#f2e0c2] transition-colors duration-300 hidden md:block" href="./singup">Sing Up</a>
      </div>
    </nav>
  )
}

export default Nav