import {Router} from 'express';
import {authenticate, adminAuthenticate} from '../auth/authenticate.js';
const router = Router();

import {createCategory, getCategories, getCategoryById, updateCategory, deleteCategory} from "../controllers/categoryController.js";


router.get("/category", getCategories);
router.get("/category/:id", getCategoryById);
router.post("/category", authenticate,adminAuthenticate, createCategory);
router.patch("/category/:id", authenticate,adminAuthenticate, updateCategory);
router.delete("/category/:id", authenticate,adminAuthenticate, deleteCategory);


export default router;
