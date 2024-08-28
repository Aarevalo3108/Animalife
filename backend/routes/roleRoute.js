import { Router } from 'express';
import {authenticate, adminAuthenticate} from '../auth/authenticate.js';
const router = Router();

import {createRole, getRoles, getRoleById, updateRole, deleteRole} from "../controllers/roleController.js";


router.get("/roles", authenticate,adminAuthenticate, getRoles);
router.get("/roles/:id", authenticate, getRoleById);
router.post("/roles", authenticate,adminAuthenticate, createRole);
router.patch("/roles/:id", authenticate,adminAuthenticate, updateRole);
router.delete("/roles/:id", authenticate,adminAuthenticate, deleteRole);


export default router;