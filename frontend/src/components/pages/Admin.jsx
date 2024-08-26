import { Link } from "react-router-dom"
import { useEffect } from "react";
import colors from "../../utils/colors";

const Admin = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="grid gap-8 px-4 py-8">
      <h1 className="text-3xl place-self-center">Admin Panel.</h1>
      <div className="grid grid-cols-2 justify-items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <img className="h-16 w-16 bg-transparent" src="/svg/users.svg" alt="users" />
          <Link to="/admin/users" className={"w-28 text-center bg-[" + colors.n5 + "] text-[" + colors.n1 + "] p-2 hover:bg-[" + colors.n2 + "] hover:text-[" + colors.n5 + "] rounded-lg text-lg md:text-xl"}>Manage Users</Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          <img className="h-16 w-16 bg-transparent" src="/svg/products.svg" alt="products" />
          <Link to="/admin/products" className={"w-28 text-center bg-[" + colors.n5 + "] text-[" + colors.n1 + "] p-2 hover:bg-[" + colors.n2 + "] hover:text-[" + colors.n5 + "] rounded-lg text-lg md:text-xl"}>Manage Products</Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          <img className="h-16 w-16 bg-transparent" src="/svg/purchases.svg" alt="orders" />
          <Link to="/admin/orders" className={"w-28 text-center bg-[" + colors.n5 + "] text-[" + colors.n1 + "] p-2 hover:bg-[" + colors.n2 + "] hover:text-[" + colors.n5 + "] rounded-lg text-lg md:text-xl"}>Manage Orders</Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          <img className="h-16 w-16 bg-transparent" src="/svg/categories.svg" alt="categories" />
          <Link to="/admin/categories" className={"w-28 text-center bg-[" + colors.n5 + "] text-[" + colors.n1 + "] p-2 hover:bg-[" + colors.n2 + "] hover:text-[" + colors.n5 + "] rounded-lg text-lg md:text-xl"}>Manage Categories</Link>
        </div>
      </div>
    </div>
  )
}

export default Admin