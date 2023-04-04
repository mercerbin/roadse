import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  shopEmail: String,
  work: String,
  status: String,
});

const Reality = mongoose.model("works", userSchema);

export default Reality;