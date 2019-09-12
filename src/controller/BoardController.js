import Board from "../models/Board";
import Image from "../models/Image";
import Comment from "../models/Comment";
import { deleteImages, removeMulterImage } from "../middlewares";





export const postUpload = async (req, res) => {
  const {
    body: {
      title,
      content,
      category,
      fileUrls
    },
  } = req;
  try{
    const newBoard = await Board.create({
      title,
      content,
      category,
    });
    if(fileUrls){
      if(Array.isArray(fileUrls)){
        const images = await Promise.all(fileUrls.map(async (image) => {
          const newImage = await Image.create({ src : image });
          newBoard.images.push(newImage.id);
          return newImage
        }));
        if(images){
          newBoard.save();
        }
      } else {
        const image = await Image.create({ src: fileUrls });
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


export const getList = async (req, res) => {
  const { query } = req;
  if(query.searchValue === 'undefined' || query.searchValue === '') {
    const boards = await Board.find({});
    return res.status(200).json(boards);
  }
  const boards = await Board.find({ title: { $regex: '.*' + query.searchValue + '.*' } });
  return res.status(200).json(boards);
};

export const getDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
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
    console.error(error);
    return res.status(500).send('게시글 상세 서버 오류');
  }
};

export const boardDelete = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const fullBoard = await Board.findById(id).populate('images');
    await Board.findOneAndRemove({ _id : id });
    // const param = {
    //   Bucket: 'kohubi-blog/images',
    //   Key: 'filename'
    // };
    // deleteImages()
    fullBoard.images.map( async image => {
      await Image.findOneAndRemove({ _id : image.id })
    });
    return res.status(200).json("success");
  }catch(error) {
    console.error(error);
    return res.status(500).send('서버 오류');
  }
};

export const boardUpdate = async (req, res) => {
  const {
    params: { id },
    body: { 
      title, 
      content, 
      category 
    },
  } = req;
  try {
    await Board.findOneAndUpdate({ _id: id }, { title, content,  category });
    return res.status(200).json("success");
  }catch(error) {
    console.error(error);
    return res.status(500).send('게시글 수정 서버 오류');
  }
};


export const uploadImages = (req, res) => {
    return res.json(req.files.map(v => v.location));
}

export const removeImage = async (req, res, next) => {
  const {
    params: { fileName }
  } = req;
  const param = {
    Bucket: 'kohubi-blog/images',
    Key: fileName
  };
  const result = await removeMulterImage(param);
  return res.status(200).json(result);
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

