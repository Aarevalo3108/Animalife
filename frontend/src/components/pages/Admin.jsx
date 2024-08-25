import { Link } from "react-router-dom"
import colors from "../../utils/colors";

const Admin = () => {
  return (
    <div className="grid gap-8 px-4 py-8">
      <h1 className="text-3xl place-self-center">Admin Panel.</h1>
      <div className="grid grid-cols-2 gap-8">
        <Link to="/admin/products" className={"w-28 text-center bg-[" + colors.n5 + "] text-[" + colors.n1 + "] p-2 hover:bg-[" + colors.n2 + "] hover:text-[" + colors.n5 + "] rounded-lg text-lg md:text-xl place-self-center"}>Manage Products</Link>
        <Link to="/admin/users" className={"w-28 text-center bg-[" + colors.n5 + "] text-[" + colors.n1 + "] p-2 hover:bg-[" + colors.n2 + "] hover:text-[" + colors.n5 + "] rounded-lg text-lg md:text-xl place-self-center"}>Manage Users</Link>
        <Link to="/admin/categories" className={"w-28 text-center bg-[" + colors.n5 + "] text-[" + colors.n1 + "] p-2 hover:bg-[" + colors.n2 + "] hover:text-[" + colors.n5 + "] rounded-lg text-lg md:text-xl place-self-center"}>Manage Categories</Link>
        <Link to="/admin/orders" className={"w-28 text-center bg-[" + colors.n5 + "] text-[" + colors.n1 + "] p-2 hover:bg-[" + colors.n2 + "] hover:text-[" + colors.n5 + "] rounded-lg text-lg md:text-xl place-self-center"}>Manage Orders</Link>
      </div>
    </div>
  )
}

export default Admin