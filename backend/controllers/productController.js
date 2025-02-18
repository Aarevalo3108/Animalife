import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Role from "../models/roleModel.js";
import options from "../tools/options.js";
import regex from "../tools/regex.js";

export const getProducts = async (req, res) => {
  try {
    options.page = Number(req.query.page) || 1;
    options.limit = Number(req.query.limit) || 12;
    options.sort = req.query.sort || '-createdAt';
    console.log(options);
    if(req.headers.role) {
      const adminRole = await Role.findById(req.headers.role);
      if(adminRole.name === "Admin") {
        const products = await Product.paginate({}, options);
        return res.status(200).json(products);
      }
    }
    const products = await Product.paginate({deleted: false}, options);
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

export const getProductById = async (req, res) => {
  try {
    if(req.headers.role) {
      const adminRole = await Role.findById(req.headers.role);
      if(adminRole.name === "Admin") {
        const product = await Product.paginate({_id: req.params.id}, options);
        return res.status(200).json(product);
      }
    }
    const product = await Product.paginate({deleted: false, _id: req.params.id}, options);
    return res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export const searchProducts = async (req, res) => {
  options.page = Number(req.query.page) || 1;
  options.limit = Number(req.query.limit) || 12;
  options.sort = req.query.sort || '-createdAt';
  const searchCriteria = [];
  const searchOptions = {
    deleted: false,
  }
  try {
    if(req.headers.name) searchCriteria.push({ name: { $regex: req.headers.name, $options: 'i' } });
    if(req.headers.category) {
      const categoryExists = await Category.find({name: req.headers.category});
      if (!categoryExists) {
        return res.status(404).json({ message: "Category not found, check name" });
      }
      searchCriteria.push({ category: categoryExists[0]._id });
    }
    if(searchCriteria.length){
      searchOptions.$and = searchCriteria;
    }
    const products = await Product.paginate(searchOptions, options);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}


export const createProduct = async (req, res) => {
  try {
    if(!regex.name.test(req.body.name)){
      return res.status(500).json({message: "Name is not valid"})
    }
    if(!regex.description.test(req.body.description)){
      return res.status(500).json({message: "Description is not valid"})
    }
    const categoryExists = await Category.find({name: req.body.category});
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found, check name" });
    }
    req.body.category = categoryExists._id;
    const product = new Product(req.body);
    await product.save();
    const paginatedProduct = await Product.paginate({_id: product._id, deleted: false}, options);
    res.status(201).json(paginatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export const updateProduct = async (req, res) => {
  try {
    req.body.updatedAt = Date.now();
    if(!regex.name.test(req.body.name)){
      return res.status(500).json({message: "Name is not valid"})
    }
    if(!regex.description.test(req.body.description)){
      return res.status(500).json({message: "Description is not valid"})
    }
    if(req.body.category){
      const categoryExists = await Category.find({name: req.body.category});
      if (!categoryExists) {
        return res.status(404).json({ message: "Category not found, check name" });
      }
      req.body.category = categoryExists[0]._id;
    }
    const product = await Product.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true});
    const paginatedProduct = await Product.paginate({_id: product._id}, options);
    res.json(paginatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export const submitImg = async (req, res) => {
  try {
    if(req.files.length === 0){
      return res.status(500).json({message: "images not found"});
    }
    const imgsArray = [];
    req.files.map((file) => {
      if(file.mimetype !== "image/png" && file.mimetype !== "image/jpg" && file.mimetype !== "image/jpeg" && file.mimetype !== "image/webp"){
        return res.status(500).json({message: `image, ${file.filename}, not valid, only png, jpg, webp and jpeg allowed`});
      }
      if(file.size > 5000000 || file.size === 0){
        return res.status(500).json({message: `image, ${file.filename}, not valid, max 5MB allowed and not empty`});
      }
      imgsArray.push(file.path);
    });
    const product = await Product.findByIdAndUpdate({_id: req.params.id}, {images: imgsArray}, {new: true});
    const paginated = await Product.paginate({_id: product._id}, options);
    res.status(201).json(paginated);
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


