/*

Una compra tiene:

- Usuario (ObjectId, ref: Usuario, obligatorio)
- Productos (array, minimo 1 producto, obligatorio)
- Total (number, minimo 0, obligatorio)
- Fecha de compra (Date, default: Date)
- Fecha de creación (Date, default: Date)
- Fecha de actualización (Date, default: Date)
- Fecha de eliminación (Date, default: null)
- Eliminado (boolean)

*/

import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: "User", required: true },
  products: {type: [
  {
    _id: {type: Schema.Types.ObjectId, required: true, ref: "Product"},
    quantity: {type: Number, min: 0, max: 1000000, required: true}
  }
  ], required: true, ref: "Product"},
  total: {type: Number, required: true, min: 0 },
  createdAt: {type: Date, default: Date.now },
  updatedAt: {type: Date, default: Date.now },
  deletedAt: {type: Date, default: null },
  deleted: {type: Boolean, default: false }
});

purchaseSchema.plugin(mongoosePaginate);

const Purchase = mongoose.model("Purchase", purchaseSchema);

Purchase.paginate().then({});

export default Purchase;