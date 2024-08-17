import {Router} from 'express';
import multer from 'multer';
import authenticate from '../auth/authenticate.js';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage, limits: { files: 1 } });
const router = Router();

import {hello, createUser, getUsers, getUserById, updateUser, deleteUser, submitImg, authUser, refreshToken, userData} from "../controllers/userController.js";


router.get("/", hello);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.get("/userdata", authenticate, userData);
router.post("/login", authUser);
router.post("/refresh-token", refreshToken);

router.patch("/users/:id", updateUser);
router.patch("/users/imgs/:id", upload.single('file'), submitImg);
router.delete("/users/:id", deleteUser);


export default router;


