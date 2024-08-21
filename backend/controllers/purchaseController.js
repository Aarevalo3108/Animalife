import Purchase from "../models/purchaseModel.js";
import User from "../models/userModel.js";
import checkProducts from "../tools/checkProducts.js";
import options from "../tools/options.js";
import transporter from "../tools/mailAdapter.js";
import "dotenv/config";

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
    const user = await User.findById(req.body.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const products = await checkProducts(req.body.products);
    if (!products.found) {
      return res.status(404).json({ message: "Product or products not found, check IDs" });
    }
    req.body.total = products.total;
    const purchase = new Purchase(req.body);
    await purchase.save();
    await User.findByIdAndUpdate(user._id, { $push: { purchases: purchase._id } }, { new: true });
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "Animalife - Purchase",
      html: `<p>Dear ${user.name},</p>
      <p>Thank you for your purchase. Here are the details:</p>
      <p>Products: ${products.names}</p>
      <p>Total: $${products.total}</p>
      <p>Order ID: ${purchase._id}</p>`,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    const paginatedPurchase = await Purchase.paginate({deleted: false, _id: purchase._id}, options);
    res.status(201).json(paginatedPurchase);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
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

