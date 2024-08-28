import url from "../../utils/urls";
import axios from "axios";
import Loading from "../Loading";
import ProductUpload from "../ProductUpload";
import ImagesHandler from "../ImagesHandler";
import { useAuth } from "../../auth/AuthProvider";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


const ProductImgs = () => {
  const [product, setProduct] = useState({});
  const auth = useAuth();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${url.backend}/product/${id}`, {
        headers: {
          "Authorization": `Bearer ${auth.getAccessToken()}`,
          "role": auth.getUser().role || "unknown",
        },
      });
      console.log(response.data.docs[0]);
      setProduct(response.data.docs[0]);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    getProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full min-h-[85vh] flex flex-col p-8 items-center gap-8">
      <h1 className="text-3xl">Product Image</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      {loading && <Loading />}
      {product && (
        <>
          {product.images && <ImagesHandler images={product.images} />}
          <ProductUpload id={id} />
          <div className="grid grid-cols-2 gap-4">
            <Link to={`/admin/products/${product._id}`} className={"text-center bg-n5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"}>
              Skip for now
            </Link>
            <Link to={`/admin/products/${product._id}`} className={"text-center bg-n4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"}>
              Save
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductImgs;