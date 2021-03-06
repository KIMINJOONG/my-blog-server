import Board from '../../models/Board';
import Image from '../../models/Image';
import Comment from '../../models/Comment';
import { removeMulterImage } from '../../middlewares';
import boardService from './service';
import { responseMessage } from '../../statusMessage';

export default {
  uploadBoard: async (req, res) => {
    const {
      body: { title, content, category, fileUrls, videoUrl },
    } = req;
    try {
      const newBoard = await boardService.insertBoard(
        title,
        content,
        category,
        fileUrls,
        videoUrl,
        res,
      );
      console.log(newBoard);
      return res.status(200).json(responseMessage(true));
    } catch (e) {
      console.error(e);
      return res
        .status(401)
        .json(responseMessage(false, '게시글 등록 에러발생'));
    }
  },
  updateBoard: async (req, res, next) => {
    const {
      params: { id },
      body: { title, content, category, videoUrl },
    } = req;
    try {
      await boardService.updateBoard(
        title,
        content,
        category,
        videoUrl,
        id,
        res,
      );
      return res.status(200).json(responseMessage(true));
    } catch (error) {
      return res.status(400).json(responseMessage(false, error));
    }
  },
  deleteBoard: async (req, res, next) => {
    const {
      params: { id },
    } = req;
    try {
      await boardService.deleteBoard(id, res);
      return res.status(200).json(responseMessage(true));
    } catch (error) {
      return res.status(400).json(responseMessage(false, error));
    }
  },
  getBoard: async (req, res, next) => {
    const {
      params: { id },
    } = req;
    try {
      const boardDetail = await boardService.getBoard(id);
      return res.status(200).json(boardDetail);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  },
  uploadImages: async (req, res, next) => {
    return res.json(req.files.map(v => v.location));
  },
  removeImage: async (req, res, next) => {
    const {
      params: { fileName },
    } = req;
    const fullFileName =
      'https://kohubi-blog.s3.ap-northeast-2.amazonaws.com/images/' + fileName;
    try {
      await Image.remove({ src: fullFileName });
    } catch (error) {
      // 게시글 수정에서 이미지 파일 삭제가 아닌 업로드중 이미지 삭제는 당연히 에러이므로 상관x
    }
    const param = {
      Bucket: 'kohubi-blog/images',
      Key: fileName,
    };

    const result = await removeMulterImage(param);
    return res.status(200).json(result);
  },
  insertComment: async (req, res, next) => {
    const {
      params: { id },
      body: { comment },
      user,
    } = req;
    try {
      const board = await Board.findById(id);
      const newComment = await Comment.create({
        text: comment,
        creator: user._id,
      });
      board.comments.push(newComment._id);
      await board.save();
      const boardDetail = await Board.findById(id)
        .populate('images')
        .populate([
          {
            path: 'comments',
            populate: [
              {
                path: 'creator',
                model: 'User',
                select: ['id'],
              },
            ],
          },
        ]);
      return res.status(200).json(boardDetail);
    } catch (error) {
      console.log(error);
      return res.status(400);
    }
  },
};
