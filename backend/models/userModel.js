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
import regex from "../tools/regex.js";
import { generateAccessToken, generateRefreshToken } from "../auth/generateToken.js";
import getUserInfo  from "../tools/getUserInfo.js";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, required: true, minLength: 3, maxLength: 50, match: regex.name },
  lastName: {type: String, required: true, minLength: 3, maxLength: 50, match: regex.lastName },
  phone: {type: String, required: true },
  image: {type: String, default: null },
  email: {type: String, required: true, unique: true, match: regex.email },
  password: {type: String, required: true},
  role: {type: Schema.Types.ObjectId, ref: "Role", default: null },
  purchases: {type: [Schema.Types.ObjectId], ref: "Purchase", default: []},
  totalPurchases: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  deletedAt: {type: Date, default: null},
  deleted: {type: Boolean, default: false}
});

userSchema.plugin(mongoosePaginate);

userSchema.methods.createAccessToken = function () {
  return generateAccessToken(getUserInfo(this));
};

userSchema.methods.createRefreshToken = async function () {
  const refreshToken = generateRefreshToken(getUserInfo(this));
  try {
    await new Token({ token: refreshToken }).save();
  } catch (error) {
    console.log(error);
  }
  return refreshToken;
};

const User = mongoose.model("User", userSchema);

User.paginate().then({});

export default User;