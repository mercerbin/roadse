import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    role: { type: String, default: "user" },
    name: String,
    email: String,
    password: { type: String, select: false },
    auth: { type: String, default: "" },
});

const Reality = mongoose.model("users", userSchema);

export default Reality;