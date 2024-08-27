import url from "../../utils/urls";
import colors from "../../utils/colors";
import axios from "axios";
import Loading from "../Loading";
import FileUpload from "../FileUpload";
import { useAuth } from "../../auth/AuthProvider";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


const UserImg = () => {
  const [user, setUser] = useState({});
  const auth = useAuth();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${url.backend}/users/${id}`, {
        headers: {
          "Authorization": `Bearer ${auth.getAccessToken()}`
        },
      });
      console.log(response.data.docs[0]);
      setUser(response.data.docs[0]);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full min-h-[85vh] flex flex-col p-8 items-center gap-8">
      <h1 className="text-3xl">User Image</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      {loading && <Loading />}
      {user && (
        <>
          <img className="w-64 h-64 rounded-full" src={url.backend + "/" + (user.image ? user.image : "uploads/JoneDoe.png")}
          alt="User Image"
          />
          <FileUpload id={id} />
          <div className="grid grid-cols-2 gap-4">
            <Link to={`/admin/users/${user._id}`} className={"text-center bg-["+colors.n5+"] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"}>
              Skip for now
            </Link>
            <Link to={`/admin/users/${user._id}`} className={"text-center bg-["+colors.n4+"] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"}>
              Save
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default UserImg;