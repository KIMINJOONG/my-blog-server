import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: {
    type: String
  },
  password: String,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const model = mongoose.model("User", UserSchema);
export default model;
