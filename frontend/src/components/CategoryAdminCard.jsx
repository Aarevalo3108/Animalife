import PropType from "prop-types";
import { useAuth } from "../auth/AuthProvider";
import { useState, useEffect } from "react";
import dateFormat from "../utils/dateFormat";
import Loading from "./Loading";
import url from "../utils/urls";
import axios from "axios";

const CategoryAdminCard = ({ category }) => {

  const auth = useAuth();
  const [name, setName] = useState(category.name);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.patch(`${url.backend}/category/${category._id}`, { name },
        {
          headers: {
            "Authorization": `Bearer ${auth.getAccessToken()}`,
            "Role": `${auth.getUser().role}`,
          },
        });
      if (response.status === 200) {
        console.log("Edit successful");
      }
    } catch (error) {
      setError(`Error[${error.response.status}]: ${error.response.data.message}`);
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setName(category.name);
  }, [category]);

  return (
    <div className={"relative bg-n2 text-n5 rounded-lg shadow-lg p-4 flex flex-col justify-center items-center gap-4"}>
      <p onClick={() => handleCopy(category._id)} className={"flex items-center gap-1 text-xs cursor-pointer"} title={`Click to copy`}>ID: {category._id}
        <img className="h-4 w-4" src="/svg/copy.svg" alt="copy" />
      </p>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? <Loading /> : <form onSubmit={(e) => e.preventDefault()} className="flex flex-col justify-center items-center gap-4">
        <label className="text-md flex justify-center items-center gap-2 cursor-pointer">Name:
          <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className={" w-32 text-center bg-n5 text-n1 p-1 rounded-lg"} />
          <img className="h-4 w-4 hover:scale-125 transition duration-300" src="/svg/edit.svg" alt="" />
        </label>
        <label className="text-md flex justify-center items-center gap-2">Active:
          <input type="checkbox" name="active" id="active" checked={!category.deleted} onChange={() => handleSubmit()} className="w-4 h-4" />
        </label>
        <button disabled={name === category.name} title={name === category.name ? "Name cannot be the same" : "Click to edit"} onClick={() => handleSubmit()} type="submit" className={"bg-n4 text-n1 py-1 px-8 hover:bg-n1 hover:text-n5 hover:scale-105 transition duration-300 rounded-lg" + (name === category.name ? " cursor-not-allowed opacity-50" : "")}>
          Edit
        </button>
      <div className="flex flex-col justify-center items-center">
        <p className="text-sm">Created: {dateFormat(category.createdAt)}</p>
        <p className="text-sm">Updated: {category.updatedAt ? dateFormat(category.updatedAt) : "N/A"}</p>
        <p className="text-sm">Deleted: {category.deletedAt ? dateFormat(category.deletedAt) : "N/A"}</p>
      </div>
      </form>}
    </div>
  );
};

CategoryAdminCard.propTypes = {
  category: PropType.shape({
    _id: PropType.string.isRequired,
    name: PropType.string.isRequired,
    createdAt: PropType.string.isRequired,
    updatedAt: PropType.string.isRequired,
    deletedAt: PropType.string,
    deleted: PropType.bool.isRequired
  }).isRequired,
};

export default CategoryAdminCard;