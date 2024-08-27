/*

Un producto tiene:

- Nombre (string, minimo 2 caracteres, maximo 50 caracteres, no puede contener caracteres especiales, admite espacios, obligatorio, único)
- Precio (number, minimo 0, maximo 1000000, obligatorio)
- Cantidad (number, minimo 0, maximo 1000000, obligatorio)
- Categoria (ObjectId, default: null, ref: Categoria)
- Imagenes (array, default: [], minimo 1 imagen, maximo 5 imagenes)
- Descripción (string, minimo 2 caracteres, maximo 500 caracteres, no puede contener caracteres especiales, admite espacios, obligatorio)
- Descuento (number, minimo 0, maximo 100, default: 0)
- Fecha de creación (Date, default: Date)
- Fecha de actualización (Date, default: Date)
- Fecha de eliminación (Date, default: null)
- Eliminado (boolean)

*/

import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import regex from "../tools/regex.js";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {type: String, required: true, unique: true, minLength: 2, maxLength: 50, match: regex.name },
  price: {type: Number, required: true, min: 0, max: 1000000 },
  sales: {type: Number, default: 0 },
  quantity: {type: Number, required: true, min: 0, max: 1000000 },
  category: {type: Schema.Types.ObjectId, ref: "Category", default: null },
  images: {type: [String], default: [], minLength: 1, maxLength: 5 },
  description: {type: String, required: true, minLength: 2, maxLength: 500, match: regex.description },
  discount: {type: Number, min: 0, max: 100, default: 0 },
  createdAt: {type: Date, default: Date.now },
  updatedAt: {type: Date, default: Date.now },
  deletedAt: {type: Date, default: null },
  deleted: {type: Boolean, default: false }
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model("Product", productSchema);

Product.paginate().then({});

export default Product;