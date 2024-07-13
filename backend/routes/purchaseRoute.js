import {Router} from 'express';
const router = Router();

import {createPurchase, getPurchases, getPurchaseById, updatePurchase, deletePurchase} from "../controllers/purchaseController.js";


router.get("/purchases", getPurchases);
router.get("/purchases/:id", getPurchaseById);
router.post("/purchases", createPurchase);
router.patch("/purchases/:id", updatePurchase);
router.delete("/purchases/:id", deletePurchase);

export default router;