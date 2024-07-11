
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/Animalife');

const users = require('./routes/userRoute');
const roles = require('./routes/roleRoute');
const categories = require('./routes/categoryRoute');
const purchases = require('./routes/purchaseRoute');
const products = require('./routes/productRoute');

app.use(
  users,
  roles,
  categories,
  purchases,
  products
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})