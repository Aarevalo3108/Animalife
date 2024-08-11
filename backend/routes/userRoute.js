import {Router} from 'express';
import multer from 'multer';
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

import {hello, createUser, getUsers, getUserById, updateUser, deleteUser, submitImg} from "../controllers/userController.js";


router.get("/", hello);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.patch("/users/imgs/:id", upload.single('file'), submitImg);
router.delete("/users/:id", deleteUser);


export default router;


