import {Router} from 'express';
import productUpload from '../tools/productImgUpload.js';
import {authenticate, adminAuthenticate} from '../auth/authenticate.js';
const router = Router();

import {createProduct, getProducts, getProductById, searchProducts, updateProduct, deleteProduct, submitImg} from "../controllers/productController.js";


router.get("/product", getProducts);
router.get("/product/:id", getProductById);
router.get("/search", searchProducts);
router.post("/product", authenticate,adminAuthenticate, createProduct);
router.patch("/product/:id", authenticate,adminAuthenticate, updateProduct);
router.patch("/product/imgs/:id", authenticate,adminAuthenticate, productUpload.array('files'), submitImg);
router.delete("/product/:id", authenticate,adminAuthenticate, deleteProduct);

export default router;