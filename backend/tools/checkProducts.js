import Product from "../models/productModel.js";


const checkProducts = async (array) => {
  const onlyIDs = array.map((obj) => obj._id);
  const onlyQuantity = array.map((obj) => obj.quantity);
  const records = await Product.find({ '_id': { $in: onlyIDs } });
  if (!records.length || records.length !== onlyIDs.length) {
    console.log(records.length, onlyIDs.length, "records.length, onlyIDs.length");
    return { message: "Product or products not found, check IDs", found: false };
  }
  // check if quantity do not exceed stock
  for (let i = 0; i < records.length; i++) {
    if (records[i].quantity < onlyQuantity[i]) {
      console.log(records[i].quantity, onlyQuantity[i], "records[i].quantity, onlyQuantity[i]");
      return { message: "Not enough stock for: " + records[i].name + ". ID: " + records[i]._id, found: false };
    }
    if(onlyQuantity[i] <= 0) {
      return { message: "Quantity must be greater than 0. ID: " + records[i]._id, found: false };
    }
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
    price: obj.price * (1 - (obj.discount / 100)),
  }));

  const productsData = {
    found: true,
    total: updatedProducts.map((obj) => obj.price * obj.quantity).reduce((a, b) => a + b, 0),
    updatedProducts // Add the new array to productsData
  };
  return productsData;
}

export default checkProducts