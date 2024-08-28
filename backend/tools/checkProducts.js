import Product from "../models/productModel.js";


const checkProducts = async (array) => {
  const onlyIDs = array.map((obj) => obj._id);
  const onlyQuantity = array.map((obj) => obj.quantity);
  const records = await Product.find({ '_id': { $in: onlyIDs } });
  if (!records.length || records.length !== onlyIDs.length) {
    return { message: "Product or products not found, check IDs", found: false };
  }
  // add sales to products (items bought) and reduce quantity in stock
  for (let i = 0; i < records.length; i++) {
    records[i].sales += onlyQuantity[i];
    records[i].quantity -= onlyQuantity[i];
    await records[i].save();
  }
  // Create a new array with price included
  const updatedProducts = records.map((obj, i) => ({
    _id: obj._id,
    quantity: onlyQuantity[i],
    price: obj.price * (1 - (obj.discount / 100))
  }));

  const productsData = {
    found: true,
    names: records.map((obj) => obj.name).join(", "),
    total: updatedProducts.map((obj) => obj.price * obj.quantity).reduce((a, b) => a + b, 0),
    updatedProducts // Add the new array to productsData
  };
  return productsData;
}

export default checkProducts