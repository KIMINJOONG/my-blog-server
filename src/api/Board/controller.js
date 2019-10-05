import Board from "../../models/Board";
import Image from "../../models/Image";
import Comment from "../../models/Comment";
import { removeMulterImage } from "../../middlewares";

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
        const newBoard = await Board.create({
          title,
          content,
          category,
          videoUrl
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
        await Board.findOneAndUpdate({ _id: id }, { title, content,  category, videoUrl });
        return res.status(200).json("success");
      }catch(error) {
        console.error(error);
        return res.status(500).send('게시글 수정 서버 오류');
      }
    },
    deleteBoard: async(req, res, next) => {
      const {
        params: { id }
      } = req;
      try {
        const fullBoard = await Board.findById(id).populate('images');
        await Board.findOneAndRemove({ _id : id });
        
        fullBoard.images.map( async image => {
          let fileName = image.src.split('images/');
          fileName = fileName[1];
          const param = {
            Bucket: 'kohubi-blog/images',
            Key: fileName
          };
          await removeMulterImage(param);
          await Image.findOneAndRemove({ _id : image.id })
        });
        return res.status(200).json("success");
      }catch(error) {
        console.error(error);
        return res.status(500).send('서버 오류');
      }
    },
    getBoard: async(req, res, next) => {
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