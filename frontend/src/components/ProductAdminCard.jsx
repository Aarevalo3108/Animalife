import PropTypes from 'prop-types';
import url from '../utils/urls';
import { Link } from "react-router-dom";
import colors from '../utils/colors';

const handleCopy = (text) => {
  navigator.clipboard.writeText(text);
}

/*

		{
			"_id": "6692b556fed81becbaf1973b",
			"name": "Dog Chow Adultos Minis y Pequeños",
			"price": 10,
			"quantity": 20,
			"category": "66c7c5514d51ca490019508b",
			"images": [
				"uploads\\products\\6692b556fed81becbaf1973b\\1724478260982-DogChow.webp"
			],
			"description": "PURINA DOG CHOW Sin Colorantes Adultos Minis y Pequeños ahora con ExtraLife, una mezcla especial libre de colorantes, con antioxidantes, vitaminas y minerales que ayuda a maximizar la calidad de vida de tu perro, día tras día.",
			"discount": 0,
			"deletedAt": null,
			"deleted": false,
			"createdAt": "2024-07-13T17:11:50.677Z",
			"updatedAt": "2024-08-22T23:10:42.716Z",
			"__v": 0
		}

*/

const ProductAdminCard = ({product}) => {
  return (
    <div className={"bg-[" + colors.n2 + "] text-[" + colors.n5 + "] p-4 rounded-lg flex flex-col items-center gap-1"}>
      <p onClick={() => handleCopy(product._id)} className={"flex items-center gap-1 text-xs cursor-pointer"} title={`Click to copy`}>ID: {product._id}
        <img className="h-4 w-4" src="/svg/copy.svg" alt="copy" />
      </p>
      <Link className="w-full h-full cursor-pointer flex justify-center" to={`/admin/products/${product._id}`}>
        <img className="h-48 w-40 object-cover rounded-lg" src={url.backend + "/" + (product.images[0] ? product.images[0] : "uploads/placeholder.svg")} alt={product.name} />
      </Link>
      <h3 className="text-md font-bold">{product.name}</h3>
      <p className="text-sm">On Stock: {product.quantity}</p>
      <p className="text-sm">Price: ${product.price.toFixed(2)}</p>
      <p className="text-sm">Active: <span className={(product.deleted ? "text-red-500" : "text-green-500")}>{product.deleted ? "No" : "Yes"}</span></p>
      <p className="text-xs">Category: {product.category}</p>
      <Link className={"text-sm bg-[" + colors.n5 + "] text-[" + colors.n1 + "] py-1 px-2 hover:scale-105 transition duration-300 rounded-full"} to={`/admin/products/${product._id}`}>View Product</Link>
    </div>
  );
};

ProductAdminCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired,
    quantity: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    deletedAt: PropTypes.string,
    deleted: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
  }),
};

export default ProductAdminCard;