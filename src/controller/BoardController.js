import Board from "../models/Board";
import Image from "../models/Image";
import Comment from "../models/Comment";




export const postUpload = async (req, res) => {
  const {
    body: {
      title,
      content,
      category,
      fileUrl
    },
  } = req;
  try{
    const newBoard = await Board.create({
      title,
      content,
      category,
    });
    if(fileUrl){
      if(Array.isArray(fileUrl)){
        const images = await Promise.all(fileUrl.map(async (image) => {
          const newImage = await Image.create({ src : image });
          newBoard.images.push(newImage.id);
          return newImage
        }));
        if(images){
          newBoard.save();
        }
      } else {
        const image = await Image.create({ src: fileUrl });
        newBoard.images.push(image.id);
        newBoard.save();
      }
    }
    res.status(200).json(newBoard);
  }catch(e){
    console.error(e);
    next(e);
  }
};

export const searchBoard = async (req, res) => {
  const {
    params: {searchTerm}
  } = req;
  const boards = await Board.find({ title : searchTerm});
  res.status(200).json(boards);
}

export const getList = async (req, res) => {
  const boards = await Board.find({}).populate('images');
  return res.status(200).json(boards);
};

export const getDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  const boardDetail = await Board.findById(id).populate('images').populate([
    {
      path: 'comments',
      populate: [{
        path: 'creator',
        model: 'User',
        select: ['id']
      }]
    },
  ]);

  return res.status(200).json(boardDetail);
};

export const boardDelete = async (req, res) => {
  const {
    params: { id }
  } = req;
  await Board.findOneAndRemove({ _id: id });
  res.status(200).json("success");
};

export const boardUpdate = async (req, res) => {
  const {
    params: { id },
    body: { title, content, category }
  } = req;
  await Board.findOneAndUpdate({ _id: id }, { title, content,  category });
  res.status(200).json("success");
};


export const uploadImages = (req, res) => {
    return res.json(req.files.map(v => v.filename));
}

// Add Comment
export const postAddComment = async(req,res) => {
  const {
      params : { id },
      body: { comment },
      user
  } = req;
  try {

      const board = await Board.findById(id);
      const newComment = await Comment.create({
          text: comment,
          creator: user._id,
      });
      board.comments.push(newComment._id);
      await board.save();
      const boardDetail = await Board.findById(id).populate('images').populate([
        {
          path: 'comments',
          populate: [{
            path: 'creator',
            model: 'User',
            select: ['id']
          }]
        },
      ]);
      return res.status(200).json(boardDetail);
  }catch(error) {
    console.log(error);
      return res.status(400);
  }
};

