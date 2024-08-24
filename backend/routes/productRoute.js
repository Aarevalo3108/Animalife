import {Router} from 'express';
import productUpload from '../tools/productImgUpload.js';
const router = Router();

import {createProduct, getProducts, getProductById, searchProducts, updateProduct, deleteProduct, submitImg} from "../controllers/productController.js";


router.get("/product", getProducts);
router.get("/product/:id", getProductById);
router.get("/search", searchProducts);
router.post("/product", createProduct);
router.patch("/product/:id", updateProduct);
router.patch("/product/imgs/:id", productUpload.array('files'), submitImg);
router.delete("/product/:id", deleteProduct);

export default router;