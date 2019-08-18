import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  src: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
    },
});

const model = mongoose.model("Image", ImageSchema);
export default model;
