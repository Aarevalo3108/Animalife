import {Router} from 'express';
import authenticate from '../auth/authenticate.js';
import userUpload from '../tools/userImgUpload.js';
const router = Router();

import {hello, createUser, getUsers, getUserById, updateUser, deleteUser, submitImg, authUser, logout, refreshToken, userData} from "../controllers/userController.js";


router.get("/", hello);
router.get("/users", authenticate, getUsers);
router.get("/users/:id", authenticate, getUserById);
router.post("/users", createUser);
router.get("/userdata", authenticate, userData);
router.post("/login", authUser);
router.delete("/logout", logout);
router.post("/refresh-token", refreshToken);
router.patch("/users/:id", authenticate, updateUser);
router.patch("/user/img/:id", authenticate, userUpload.single('file'), submitImg);
router.delete("/users/:id", authenticate, deleteUser);


export default router;


