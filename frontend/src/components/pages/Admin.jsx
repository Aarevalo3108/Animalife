import { Link } from "react-router-dom"
import { useEffect } from "react";

const Admin = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className={"grid gap-8 px-4 py-8"}>
      <h1 className="text-3xl place-self-center">Admin Panel.</h1>
      <div className="grid grid-cols-2 justify-items-center gap-4">
        <div className="flex flex-col items-center gap-2 shadow-lg">
          <img className="h-16 w-16 md:h-20 md:w-20 bg-transparent" src="/svg/users.svg" alt="users" />
          <Link to="/admin/users" className={"w-28 text-center bg-n5 text-n1 p-2 hover:bg-n2 hover:text-n5 transition duration-150 rounded-lg text-lg ld:text-xl md:text-xl"}>Manage Users</Link>
        </div>
        <div className="flex flex-col items-center gap-2 shadow-lg">
          <img className="h-16 w-16 md:h-20 md:w-20 bg-transparent" src="/svg/products.svg" alt="products" />
          <Link to="/admin/products" className={"w-28 text-center bg-n5 text-n1 p-2 hover:bg-n2 hover:text-n5 transition duration-150 rounded-lg text-lg ld:text-xl md:text-xl"}>Manage Products</Link>
        </div>
        <div className="col-span-2 flex flex-col items-center gap-2 shadow-lg">
          <img className="h-16 w-16 md:h-20 md:w-20 bg-transparent" src="/svg/stats.svg" alt="stats" />
          <Link to="/admin/stats" className={"w-28 text-center bg-n5 text-n1 p-2 hover:bg-n2 hover:text-n5 transition duration-150 rounded-lg text-lg ld:text-xl md:text-xl"}>View Stats</Link>
        </div>
        <div className="flex flex-col items-center gap-2 shadow-lg">
          <img className="h-16 w-16 md:h-20 md:w-20 bg-transparent" src="/svg/purchases.svg" alt="orders" />
          <Link to="/admin/orders" className={"w-28 text-center bg-n5 text-n1 p-2 hover:bg-n2 hover:text-n5 transition duration-150 rounded-lg text-lg ld:text-xl md:text-xl"}>Manage Orders</Link>
        </div>
        <div className="flex flex-col items-center gap-2 shadow-lg">
          <img className="h-16 w-16 md:h-20 md:w-20 bg-transparent" src="/svg/categories.svg" alt="categories" />
          <Link to="/admin/categories" className={"w-28 text-center bg-n5 text-n1 p-2 hover:bg-n2 hover:text-n5 transition duration-150 rounded-lg text-lg ld:text-xl md:text-xl"}>Manage Categories</Link>
        </div>
      </div>
    </div>
  )
}

export default Admin