import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { useEffect } from "react";

const AdminButton = ({ to, text, icon }) => {
  return (
  <div className="grid justify-items-center items-center gap-2 shadow-lg rounded-lg">
    <img className="bg-transparent" src={`/svg/${icon}.svg`} alt={icon} />
    <Link to={to} className={"w-24 md:w-32 text-center bg-n5 text-n1 p-2 hover:bg-n2 hover:text-n5 transition duration-150 rounded-lg text-lg ld:text-xl md:text-xl"}>{text}</Link>
  </div>
  )
}

AdminButton.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}

const Admin = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className={"grid gap-8 p-4"}>
      <h1 className="text-3xl place-self-center">Admin Panel.</h1>
      <div className="grid grid-cols-2 justify-items-center gap-2">
        <AdminButton to="/admin/products" text="Manage Products" icon="products" />
        <AdminButton to="/admin/users" text="Manage Users" icon="users" />
        <div className="col-span-2">
          <AdminButton to="/admin/stats" text="View Stats" icon="stats" />
        </div>
        <AdminButton to="/admin/orders" text="Manage Orders" icon="purchases" />
        <AdminButton to="/admin/categories" text="Manage Categories" icon="categories" />
      </div>
    </div>
  )
}

export default Admin