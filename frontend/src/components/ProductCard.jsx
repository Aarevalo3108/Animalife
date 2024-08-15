import PropTypes from 'prop-types';

const urlBackend = "http://localhost:3001/";

const ProductCard = ({ product }) => {
  return (
    <div className="rounded-xl shadow-md bg-[#f2e0c2]">
    <img src={urlBackend+product.images[0]} alt="Gato" className="h-64 w-64 rounded-xl" />
    <div className="p-4 flex flex-col gap-2">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired
  })
}

export default ProductCard