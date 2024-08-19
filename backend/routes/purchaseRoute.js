import {Router} from 'express';
import authenticate from '../auth/authenticate.js';
const router = Router();

import {createPurchase, getPurchases, getPurchaseById, updatePurchase, deletePurchase, getPurchaseByUser} from "../controllers/purchaseController.js";


router.get("/purchases", getPurchases);
router.get("/purchases/:id", getPurchaseById);
router.get("/purchases/user/:id", authenticate, getPurchaseByUser);
router.post("/purchases", createPurchase);
router.patch("/purchases/:id", updatePurchase);
router.delete("/purchases/:id", deletePurchase);

export default router;