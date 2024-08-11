import Lines from "../assets/svg/lines.svg"
const Nav = () => {
  return (
    <nav className="bg-repeat bg-navbar flex items-center content-center p-4 sticky top-0">
      <img src={Lines} alt="lines" className="h-8 w-8" />
      <h2 className="text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Home</h2>
    </nav>
  )
}

export default Nav