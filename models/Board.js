import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  category: Number,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image"
    }
  ]
});

const model = mongoose.model("Board", BoardSchema);
export default model;
