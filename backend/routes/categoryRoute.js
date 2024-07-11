import { Router } from "express";
const router = Router();

import {createCategory, getCategories, getCategoryById, updateCategory, deleteCategory} from "../controllers/categoryController";


router.get("/category", getCategories);
router.get("/category/:id", getCategoryById);
router.post("/category", createCategory);
router.patch("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);


export default router;
