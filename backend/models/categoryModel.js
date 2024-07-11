/*

Una categoria tiene:

- Nombre (string, minimo 2 caracteres, maximo 50 caracteres,
  no puede contener caracteres especiales, admite espacios, obligatorio, único)
- Fecha de creación (Date, default: Date)
- Fecha de actualización (Date, default: Date)
- Fecha de eliminación (Date, default: null)
- Eliminado (boolean)

*/

import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import {regex} from "../tools/regex.js";
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {type: String, required: true, unique: true, minLength: 2, maxLength: 50, match: regex.name },
  createdAt: {type: Date, default: Date.now },
  updatedAt: {type: Date, default: Date.now },
  deletedAt: {type: Date, default: null },
  deleted: {type: Boolean, default: false }
});

categorySchema.plugin(mongoosePaginate);

const Category = mongoose.model("Category", categorySchema);

Category.paginate().then({});

export default Category;