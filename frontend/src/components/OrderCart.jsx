
import { Link } from "react-router-dom";
import dateFormat from "../utils/dateFormat";
import PropTypes from 'prop-types';

const OrderCart = ({ purchase, isAdmin=false }) => {
  return (
  <div className="flex gap-2 flex-col justify-center items-center">
    <h3 className="text-sm">Order ID: {purchase._id}</h3>
    <div className="flex items-center gap-2">
    <Link className="relative" to={isAdmin ? `/admin/orders/${purchase._id}` : `/order/${purchase._id}`}>
      <img className="min-h-16 min-w-16 bg-white p-4 rounded-2xl" src="/svg/shopping-cart.svg" alt="Order" />
      <img className="h-4 w-4 absolute bottom-0 right-0" src="/svg/click.svg" alt="click" />
    </Link>
    <div className="p-2 flex flex-col text-sm">
      <p className="text-n3 line-clamp-1">Created on {dateFormat(purchase.createdAt)}</p>
      <p className="text-n3">Total: ${purchase.total}</p>
    </div>
    <Link className="p-2 hidden md:block" to={isAdmin ? `/admin/orders/${purchase._id}` : `/order/${purchase._id}`}>
      <img className="min-h-4 min-w-4" src="/svg/rightArrow.svg" alt="" />
    </Link>
    </div>
  </div>
  );
}

OrderCart.propTypes = {
  purchase: PropTypes.object,
  isAdmin: PropTypes.bool
}

export default OrderCart