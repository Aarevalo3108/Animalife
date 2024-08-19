import Purchase from "../models/purchaseModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import options from "../tools/options.js";

export const getPurchases = async (req, res) => {
  try {
    options.page = Number(req.query.page) || 1;
    options.limit = Number(req.query.limit) || 12;
    const purchases = await Purchase.paginate({deleted: false}, options);
    res.json(purchases);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}


export const getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.paginate({deleted: false, _id: req.params.id}, options);
    res.json(purchase);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export const getPurchaseByUser = async (req, res) => {
  try {
    const purchases = await Purchase.paginate({deleted: false, user: req.params.id}, options);
    res.json(purchases);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}


export const createPurchase = async (req, res) => {
  try {
    // Purchase has two ObjectsID fields: user and products, that has to be validated
    const user = await User.findById(req.body.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const products = await checkProducts(req.body.products);
    if (products) {
      return res.status(404).json({ message: products });
    }
    const purchase = new Purchase(req.body);
    await purchase.save();
    const paginatedPurchase = await Purchase.paginate({deleted: false, _id: purchase._id}, options);
    res.status(201).json(paginatedPurchase);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}



const checkProducts = async (array) => {
    const onlyIDs = array.map((obj) => obj._id);
    const records = await Product.find({ '_id': { $in: onlyIDs } });
    if (!records.length || records.length !== onlyIDs.length) {
      return "Product or products not found, check IDs";
    }
}


export const updatePurchase = async (req, res) => {
  try {
    req.body.updatedAt = Date.now();
    const purchase = await Purchase.findByIdAndUpdate({_id: req.params.id, deleted: false}, req.body, {new: true});
    const paginatedPurchase = await Purchase.paginate({deleted: false, _id: purchase._id}, options);
    res.json(paginatedPurchase);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}


export const deletePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findByIdAndUpdate({_id: req.params.id, deleted: false}, {deleted: true, deletedAt: Date.now()}, {new: true});
    res.json(purchase);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

