import { Router } from 'express';
const router = Router();

import {hello, createUser, getUsers, getUserById, updateUser, deleteUser} from "../controllers/userController";


router.get("/", hello);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);


export default router;


