import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  shopName: String,
  ownerName: String,
  lati: Number,
  longi: Number,
  time: { type: String, default: "" },
});

const Reality = mongoose.model("shops", userSchema);

export default Reality;