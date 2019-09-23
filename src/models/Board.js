import mongoose, { mongo } from "mongoose";

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
  comments: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }
  ],
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image"
    }
  ],
  videos: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video"    
  }
  
});

const model = mongoose.model("Board", BoardSchema);
export default model;
