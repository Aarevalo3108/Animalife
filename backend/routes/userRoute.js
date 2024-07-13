import { Router } from 'express';
const router = Router();

import {hello, createUser, getUsers, getUserById, updateUser, deleteUser} from "../controllers/userController.js";


router.get("/", hello);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);


export default router;


