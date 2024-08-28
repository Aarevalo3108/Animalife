import multer from 'multer';
import path from 'path';
import fs from 'fs';
import User from '../models/userModel.js';

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const productId = req.params.id;

      // Check if the product exists
      const product = await User.findById(productId);
      if (!product) {
        return cb(new Error('User not found'), false);
      }

      const dir = `uploads/users/${productId}`;

      // Create the directory if it doesn't exist
      fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) {
          return cb(err);
        }
        cb(null, dir);
      });
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images of type JPEG, PNG, JPG, or WEBP are allowed!'));
  }
};

const userUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1 // 1 file
   },
  fileFilter,
});

export default userUpload;
