
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors( { origin: '*' } ));
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/Animalife');

import users from './routes/userRoute.js';
import roles from './routes/roleRoute.js';
import categories from './routes/categoryRoute.js';
import purchases from './routes/purchaseRoute.js';
import products from './routes/productRoute.js';

app.use(
  users,
  roles,
  categories,
  purchases,
  products
);

app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})