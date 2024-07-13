import {Router} from 'express';
const router = Router();

import {createProduct, getProducts, getProductById, updateProduct, deleteProduct} from "../controllers/productController.js";


router.get("/product", getProducts);
router.get("/product/:id", getProductById);
router.post("/product", createProduct);
router.patch("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;