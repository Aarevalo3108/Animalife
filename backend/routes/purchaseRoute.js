import {Router} from 'express';
const router = Router();

import {createPurchase, getPurchases, getPurchaseById, updatePurchase, deletePurchase} from "../controllers/purchaseController";


router.get("/purchases", getPurchases);
router.get("/purchases/:id", getPurchaseById);
router.post("/purchases", createPurchase);
router.put("/purchases/:id", updatePurchase);
router.delete("/purchases/:id", deletePurchase);

export default router;