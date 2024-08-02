import {Router} from 'express';
import multer from 'multer';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage, limits: { files: 5 } });
const router = Router();

import {createProduct, getProducts, getProductById, updateProduct, deleteProduct, submitImg} from "../controllers/productController.js";


router.get("/product", getProducts);
router.get("/product/:id", getProductById);
router.post("/product", createProduct);
router.patch("/product/:id", updateProduct);
router.patch("/product/imgs/:id", upload.array('files'), submitImg);
router.delete("/product/:id", deleteProduct);

export default router;