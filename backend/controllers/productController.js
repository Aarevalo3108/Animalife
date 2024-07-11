import Product from "../models/productModel";
import options from "../tools/options";
import {regex} from "../tools/regex";

export const getProducts = async (req, res) => {
  try {
    options.page = Number(req.query.page) || 1;
    options.limit = Number(req.query.limit) || 12;
    const products = await Product.paginate({deleted: false}, options);
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = await Product.paginate({deleted: false, _id: req.params.id}, options);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export const createProduct = async (req, res) => {
  try {
    if(regex.name.test(req.body.name)){
      res.status(500).json({message: "Name is not valid"})
    }
    if(regex.description.test(req.body.description)){
      res.status(500).json({message: "Description is not valid"})
    }
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export const updateProduct = async (req, res) => {
  try {
    req.body.updatedAt = Date.now();
    const product = await Product.findByIdAndUpdate({_id: req.params.id, deleted: false}, req.body, {new: true});
    const paginatedProduct = await Product.paginate({_id: product._id, deleted: false}, options);
    res.json(paginatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate({_id: req.params.id, deleted: false}, {deleted: true, deletedAt: Date.now()}, {new: true});
    const paginatedProduct = await Product.paginate({_id: product._id, deleted: false}, options);
    res.json(paginatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}


