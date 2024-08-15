


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
          <a className="text-[#a38449]" href="./">Home</a>
          <a className="text-[#a38449]" href="./shop">Shop</a>
          <a className="text-[#a38449]" href="./about">About</a>
          <a className="text-[#a38449]" href="./contact">Contact</a>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl">Support</h3>
          <a className="text-[#a38449]" href="./login">Login</a>
          <a className="text-[#a38449]" href="./singup">Sing Up</a>
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