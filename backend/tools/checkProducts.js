import Product from "../models/productModel.js";


const checkProducts = async (array) => {
  const onlyIDs = array.map((obj) => obj._id);
  const onlyQuantity = array.map((obj) => obj.quantity);
  const records = await Product.find({ '_id': { $in: onlyIDs } });
  if (!records.length || records.length !== onlyIDs.length) {
    return { message: "Product or products not found, check IDs", found: false };
  }
  const productsData = {
    found: true,
    names: records.map((obj) => obj.name).join(", "),
    total: records.map((obj, i) => obj.price * onlyQuantity[i]).reduce((a, b) => a + b, 0),
  };
  return productsData;
}

export default checkProducts