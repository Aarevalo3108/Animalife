import { useEffect } from "react";
import { Link } from "react-router-dom";


const NotFound = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="p-8 text-center font-bold min-h-[60vh] flex flex-col gap-8 items-center justify-center">
      <span className="text-5xl text-n5 font-bold">404</span>
      <span className="text-3xl text-n5 font-bold">Page Not Found!</span>
      <img className="drop-shadow-2xl z-10" src="/NotFound.png" alt="Not Found" />
      <Link to="/" className="w-28 text-center bg-n5 text-n1 p-2 hover:bg-n2 hover:text-n5 transition duration-150 rounded-lg text-lg ld:text-xl">Go Home</Link>
    </div>
  );
};

export default NotFound;