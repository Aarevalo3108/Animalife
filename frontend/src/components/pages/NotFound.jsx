import { useEffect } from "react";


const NotFound = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="p-8 text-center font-bold min-h-[85vh] flex flex-col gap-8 items-center justify-center">
      <span className="text-5xl text-n5 font-bold">404</span>
      <span className="text-3xl text-n5 font-bold">Page Not Found!</span>
      <img className="drop-shadow-2xl -z-10" src="/NotFound.png" alt="Not Found" />
    </div>
  );
};

export default NotFound;