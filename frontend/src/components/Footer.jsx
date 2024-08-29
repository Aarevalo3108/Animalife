import { Link } from "react-router-dom";



const Footer = () => {
  return (
    <footer className="bg-n5 text-n1 py-16 flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-16 md:justify-items-center">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl">Animalife</h3>
          <p className="text-n3">Bring the best products for your babies.</p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl">Quick Links</h3>
          <Link className="text-n3" to="./">Home</Link>
          <Link className="text-n3" to="./shop">Shop</Link>
          <Link className="text-n3" to="./about">About</Link>
          <Link className="text-n3" to="./contact">Contact</Link>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl">Support</h3>
          <Link className="text-n3" to="./login">Login</Link>
          <Link className="text-n3" to="./signup">Sign Up</Link>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl">Contact Us</h3>
          <p className="text-n3">123 Main Street</p>
          <p className="text-n3">Anytown, USA 12345</p>
          <p className="text-n3">(123) 456-7890</p>
          <p className="text-n3">YH7rY@example.com</p>
        </div>
      </div>
      <p className="text-center">© 2024 Animalife. All trademarks, service marks, trade names, product names, and logos appearing on this site are the property of their respective owners.</p>
    </footer>
  );
};

export default Footer;