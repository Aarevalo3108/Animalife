/*

  Un usuario tiene:

- Nombre
- Apellido
- Teléfono
- Imagen
- Correo
- Contraseña
- Rol (Admin, User)
- Carrito de compra
- Compras
- Fecha de creación
- Fecha de actualización
- Fecha de eliminación
- Eliminado (boolean)

*/

import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import {regex} from "../tools/regex.js";
const Schema = mongoose.Schema;

const usewrSchema = new Schema({
  name: {type: String, required: true, minLength: 3, maxLength: 50, match: regex.name },
  lastName: {type: String, required: true, minLength: 3, maxLength: 50, match: regex.lastName },
  phone: {type: String, required: true },
  email: {type: String, required: true, unique: true, match: regex.email },
  password: {type: String, required: true },
  role: {type: ObjectId, required: true },
  cart: {
    type: Array,
    default: [],
  },
  purchases: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

usewrSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", usewrSchema);

User.paginate().then({});

export default User;