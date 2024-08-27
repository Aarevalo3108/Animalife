
import { Link } from "react-router-dom";
import dateFormat from "../utils/dateFormat";
import PropTypes from 'prop-types';

const OrderCart = ({ purchase, isAdmin=false }) => {
  return (
  <div className="flex justify-center items-center">
    <Link to={isAdmin ? `/admin/orders/${purchase._id}` : `/order/${purchase._id}`}>
      <img className="min-h-16 min-w-16 bg-white p-4 rounded-2xl" src="/svg/shopping-cart.svg" alt="Order" />
    </Link>
    <div className="p-4 flex flex-col text-sm md:text-base">
      <h3>Order ID: {purchase._id}</h3>
      <p className="text-sm text-n3">Created on {dateFormat(purchase.createdAt)}</p>
      <p className="text-sm text-n3">Total: ${purchase.total}</p>
    </div>
    <Link className="p-4" to={isAdmin ? `/admin/orders/${purchase._id}` : `/order/${purchase._id}`}>
      <img className="min-h-4 min-w-4" src="/svg/rightArrow.svg" alt="" />
    </Link>
  </div>
  );
}

OrderCart.propTypes = {
  purchase: PropTypes.object,
  isAdmin: PropTypes.bool
}

export default OrderCart