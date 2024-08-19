import { Link } from "react-router-dom";



const Footer = () => {
  return (
    <footer className="bg-[#433526] text-[#f2e0c2] py-16 flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-16 md:justify-items-center">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl">Animalife</h3>
          <p className="text-[#a38449]">Bring the best products for your babies.</p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl">Quick Links</h3>
          <Link className="text-[#a38449]" to="./">Home</Link>
          <Link className="text-[#a38449]" to="./shop">Shop</Link>
          <Link className="text-[#a38449]" to="./about">About</Link>
          <Link className="text-[#a38449]" to="./contact">Contact</Link>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl">Support</h3>
          <Link className="text-[#a38449]" to="./login">Login</Link>
          <Link className="text-[#a38449]" to="./signup">Sign Up</Link>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl">Contact Us</h3>
          <p className="text-[#a38449]">123 Main Street</p>
          <p className="text-[#a38449]">Anytown, USA 12345</p>
          <p className="text-[#a38449]">(123) 456-7890</p>
          <p className="text-[#a38449]">YH7rY@example.com</p>
        </div>
      </div>
      <p className="text-center">© 2024 Animalife. All rights reserved.</p>
    </footer>
  );
};

export default Footer;