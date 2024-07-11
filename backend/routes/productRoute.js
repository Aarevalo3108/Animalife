import {Router} from 'express';
const router = Router();

import {createProduct, getProducts, getProductById, updateProduct, deleteProduct} from "../controllers/productController";


router.get("/product", getProducts);
router.get("/product/:id", getProductById);
router.post("/product", createProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;