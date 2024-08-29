import Purchase from "../models/purchaseModel.js";
import User from "../models/userModel.js";
import Role from "../models/roleModel.js";
import { purchasePage } from "../tools/emailPages.js";
import checkProducts from "../tools/checkProducts.js";
import options from "../tools/options.js";
import transporter from "../tools/mailAdapter.js";
import "dotenv/config";

// Admin Auth
export const getPurchases = async (req, res) => {
  try {
    options.page = Number(req.query.page) || 1;
    options.limit = Number(req.query.limit) || 12;
    options.sort = req.query.sort || '-createdAt';
    const purchases = await Purchase.paginate({}, options);
    res.json(purchases);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// User Auth
export const getPurchaseById = async (req, res) => {
  options.page = Number(req.query.page) || 1;
  try {
    const role = await Role.findById(req.user.role);
    if(role.name === "Admin") {
      const purchase = await Purchase.paginate({_id: req.params.id}, options);
      return res.status(200).json(purchase);
    }
    const purchase = await Purchase.paginate({deleted: false, _id: req.params.id}, options);
    if(purchase.docs[0].user != req.user._id) {
      console.log("Unauthorized, user trying to access another user's purchase");
      return res.status(401).json({ message: "Unauthorized" });
    }
    return res.status(200).json(purchase);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// User Auth
export const getPurchaseByUser = async (req, res) => {
  options.page = Number(req.query.page) || 1;
  options.limit = Number(req.query.limit) || 12;
  options.sort = req.query.sort || '-createdAt';
  try {
    const role = await Role.findById(req.user.role);
    if(role.name === "Admin") {
      const purchases = await Purchase.paginate({user: req.params.id}, options);
      return res.json(purchases);
    }
    const purchases = await Purchase.paginate({deleted: false, user: req.params.id}, options);
    return res.json(purchases);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// Admin Auth, Last Month Purchases
export const getLastMonthPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({createdAt: {$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}, deleted: false}).sort({total: -1});
    res.status(200).json(purchases);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}


// Only User Auth
export const createPurchase = async (req, res) => {
  try {
    if(req.user._id != req.body.user) {
      console.log("Unauthorized, user trying create another user's purchase \n User: ", req.user._id, "\n Purchase: ", req.body.user);
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(req.body.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const products = await checkProducts(req.body.products);
    if (!products.found) {
      return res.status(404).json({ message: products.message });
    }
    req.body.total = products.total;
    req.body.products = products.updatedProducts;
    const purchase = new Purchase(req.body);
    await purchase.save();
    await User.findByIdAndUpdate(user._id, { $push: { purchases: purchase._id }, $inc: { totalPurchases: 1} }, { new: true });
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "Animalife - Purchase",
      html: purchasePage(user.name, user.lastName, products.updatedProducts, products.total, purchase._id),
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    await Purchase.paginate({deleted: false, _id: purchase._id}, options);
    res.status(201).json({ message: "Purchase created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}


// Admin Auth
export const updatePurchase = async (req, res) => {
  try {
    req.body.updatedAt = Date.now();
    const purchase = await Purchase.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true});
    const paginatedPurchase = await Purchase.paginate({_id: purchase._id}, options);
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

