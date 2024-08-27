import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import dateFormat from '../utils/dateFormat';


/*

		{
			"_id": "66c392d746f36cfec7ed64bb",
			"user": "66c162b85b8d1396d2767465",
			"products": [
				{
					"_id": "6692b556fed81becbaf1973b",
					"quantity": 10
				}
			],
			"total": 100,
			"deletedAt": null,
			"deleted": false,
			"createdAt": "2024-08-19T18:45:43.631Z",
			"updatedAt": "2024-08-20T02:31:43.678Z",
			"__v": 0
		}

*/

const OrderAdminCard = ({ purchase }) => {

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
  }

  return (
    <div className={"bg-n1 text-n5 rounded-lg shadow-lg p-4 grid grid-cols-2 justify-items-center items-center gap-x-1 gap-y-2"}>
      <button onClick={() => handleCopy(purchase._id)} className={"hover:scale-105 transition duration-300 flex col-span-2 items-center gap-1 text-xs cursor-pointer"} title={`Click to copy`}>
        <h2>ID: {purchase._id}</h2>
        <img className="h-4 w-4" src="/svg/copy.svg" alt="copy" />
      </button>
      <h3 className="col-span-2 text-xs">User: {purchase.user}</h3>
      <Link className="" to={`/admin/orders/${purchase._id}`}>
        <img className="min-h-16 min-w-16 bg-white p-4 rounded-2xl" src="/svg/shopping-cart.svg" alt="Order" />
      </Link>
      <div className="flex flex-col text-sm md:text-base w-full">
        <p>{dateFormat(purchase.createdAt)}</p>
        <p>Total: ${purchase.total}</p>
      </div>
      <Link className={"col-span-2 hover:scale-105 transition duration-300  bg-n5 text-n1 px-2 py-1 hover:bg-n2 hover:text-n5 rounded-full"} to={`/admin/orders/${purchase._id}`}>
        View Order
      </Link>
    </div>
  )
}


OrderAdminCard.propTypes = {
  purchase: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    deletedAt: PropTypes.string,
    deleted: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
  })
}


export default OrderAdminCard