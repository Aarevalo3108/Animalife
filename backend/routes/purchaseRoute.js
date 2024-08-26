import {Router} from 'express';
import {authenticate, adminAuthenticate} from '../auth/authenticate.js';
const router = Router();

import {createPurchase, getPurchases, getPurchaseById, updatePurchase, deletePurchase, getPurchaseByUser} from "../controllers/purchaseController.js";


router.get("/purchases", authenticate,adminAuthenticate, getPurchases);
router.get("/purchases/:id", authenticate, getPurchaseById);
router.get("/purchases/user/:id", authenticate, getPurchaseByUser);
router.post("/purchases", authenticate, createPurchase);
router.patch("/purchases/:id", authenticate,adminAuthenticate, updatePurchase);
router.delete("/purchases/:id", authenticate,adminAuthenticate, deletePurchase);

export default router;