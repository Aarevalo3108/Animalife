import { Router } from 'express';
const router = Router();

import {createRole, getRoles, getRoleById, updateRole, deleteRole} from "../controllers/roleController.js";


router.get("/roles", getRoles);
router.get("/roles/:id", getRoleById);
router.post("/roles", createRole);
router.patch("/roles/:id", updateRole);
router.delete("/roles/:id", deleteRole);


export default router;