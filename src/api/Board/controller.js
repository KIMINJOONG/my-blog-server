import Board from "../../models/Board";
import Image from "../../models/Image";
import Comment from "../../models/Comment";
import { removeMulterImage } from "../../middlewares";
import boardService from './service';

export default {
    uploadBoard: async(req, res) => {
      const {
        body: {
          title,
          content,
          category,
          fileUrls,
          videoUrl,
        },
      } = req;
      try{
          const newBoard = await boardService.insertBoard(
            title,
            content,
            category,
            fileUrls,
            videoUrl
          );
          res.status(200).json(newBoard);
      }catch(e){
        console.error(e);
        next(e);
      }
    },
    updateBoard: async(req, res, next) => {
      const {
        params: { id },
        body: { 
          title, 
          content, 
          category,
          videoUrl
        },
      } = req;
      try {
        await boardService.updateBoard(
          title,
          content,
          category,
          videoUrl,
          id
        );
        return res.status(200).json('수정완료');
      }catch(error) {
        return res.status(500).json(error);
      }
    },
    deleteBoard: async(req, res, next) => {
      const {
        params: { id }
      } = req;
      try {
        await boardService.deleteBoard(id);
        return res.status(200).json("success");
      }catch(error) {
        return res.status(500).json(error);
      }
    },
    getBoard: async(req, res, next) => {
      const {
        params: { id }
      } = req;
      try {
        const boardDetail =await boardService.getBoard(id);
        return res.status(200).json(boardDetail);
      }catch(error) {
        console.error(error);
        return res.status(500).json(error);
      }
    },
    uploadImages: async(req, res, next) => {
      return res.json(req.files.map(v => v.location));
    },
    removeImage: async(req, res ,next ) => {
      const {
        params: { fileName }
      } = req;
      const param = {
        Bucket: 'kohubi-blog/images',
        Key: fileName
      };
      const result = await removeMulterImage(param);
      return res.status(200).json(result);
    },
    insertComment: async(req, res, next) => {
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
    }
}