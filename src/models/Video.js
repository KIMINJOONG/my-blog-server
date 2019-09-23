import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  src: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
    },
});

const model = mongoose.model("Video", VideoSchema);
export default model;
