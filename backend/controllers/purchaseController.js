import Purchase from "../models/purchaseModel";
import options from "../tools/options";

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


export const createPurchase = async (req, res) => {
  try {
    const purchase = new Purchase(req.body);
    await purchase.save();
    res.status(201).json(purchase);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}


export const updatePurchase = async (req, res) => {
  try {
    req.body.updatedAt = Date.now();
    const purchase = await Purchase.findByIdAndUpdate({_id: req.params.id, deleted: false}, req.body, {new: true});
    res.json(purchase);
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

