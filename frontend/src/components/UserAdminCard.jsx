import PropTypes from 'prop-types';
import url from '../utils/urls';
import { Link } from "react-router-dom";
import colors from '../utils/colors';

const handleCopy = (text) => {
  navigator.clipboard.writeText(text);
}

const UserAdminCard = ({user}) => {
  return (
    <div className={"bg-[" + colors.n2 + "] text-[" + colors.n5 + "] p-4 rounded-lg flex flex-col items-center gap-1"}>
      <p onClick={() => handleCopy(user._id)} className={"flex items-center gap-1 text-xs cursor-pointer"} title={`Click to copy`}>ID: {user._id}
        <img className="h-4 w-4" src="/svg/copy.svg" alt="copy" />
      </p>
      <img className="h-32 w-32 object-cover rounded-full" src={url.backend + "/" + (user.image ? user.image : "uploads/JoneDoe.png")} alt={user.name} />
      <h3 className="text-md font-bold">{user.name} {user.lastName}</h3>
      <p className="text-sm">{user.email}</p>
      <p className="text-sm">{user.phone}</p>
      <p className="text-sm">Active: <span className={(user.deleted ? "text-red-500" : "text-green-500")}>{user.deleted ? "No" : "Yes"}</span></p>
      <p className="text-xs">Role: {user.role}</p>
      <Link className={"text-sm bg-[" + colors.n5 + "] text-[" + colors.n1 + "] py-1 px-2 hover:scale-105 transition duration-300 rounded-full"} to={`/admin/users/${user._id}`}>View Profile</Link>
    </div>
  );
};

UserAdminCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    image: PropTypes.string,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    cart: PropTypes.array.isRequired,
    purchases: PropTypes.array.isRequired,
    deletedAt: PropTypes.string,
    deleted: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
  }),
};

export default UserAdminCard;