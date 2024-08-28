import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  token: {type: String, required: true },
});

const Token = mongoose.model("Token", tokenSchema);

export default Token