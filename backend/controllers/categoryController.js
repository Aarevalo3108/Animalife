import Category from "../models/categoryModel";
import options from "../tools/options";
import {regex} from "../tools/regex";


export const getCategories = async (req, res) => {
  try {
    options.page = Number(req.query.page) || 1;
    options.limit = Number(req.query.limit) || 12;
    const categories = await Category.paginate({deleted: false}, options);
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}


export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.paginate({deleted: false, _id: req.params.id}, options);
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}


export const createCategory = async (req, res) => {
  try {
    if(regex.name.test(req.body.name)){
      res.status(500).json({message: "Name is not valid"})
    }
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}


export const updateCategory = async (req, res) => {
  try {
    req.body.updatedAt = Date.now();
    const category = await Category.findByIdAndUpdate({_id: req.params.id, deleted: false}, req.body, {new: true});
    const paginatedCategory = await Category.paginate({_id: category._id, deleted: false}, options);
    res.json(paginatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}


export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate({_id: req.params.id, deleted: false}, {deleted: true, deletedAt: Date.now()}, {new: true});
    const paginatedCategory = await Category.paginate({_id: category._id, deleted: false}, options);
    res.json(paginatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}