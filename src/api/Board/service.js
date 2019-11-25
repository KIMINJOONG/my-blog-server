import Board from '../../models/Board';
import Image from '../../models/Image';
import { responseMessage } from '../../statusMessage';
export default {
  insertBoard: async (title, content, category, fileUrls, videoUrl, res) => {
    try {
      const newBoard = await Board.create({
        title,
        content,
        category,
        videoUrl,
      });
      if (fileUrls) {
        if (Array.isArray(fileUrls)) {
          const images = await Promise.all(
            fileUrls.map(async image => {
              const newImage = await Image.create({ src: image });
              newBoard.images.push(newImage.id);
              return newImage;
            }),
          );
          if (images) {
            newBoard.save();
          }
        } else {
          const image = await Image.create({ src: fileUrls });
          newBoard.images.push(image.id);
          newBoard.save();
        }
      }
      return newBoard;
    } catch (e) {
      console.error(e);
      return res
        .stauts(400)
        .json(responseMessage(false, '게시글 등록중 서비스에서 에러발생'));
    }
  },
  updateBoard: async (title, content, category, videoUrl, id, res) => {
    try {
      await Board.findOneAndUpdate(
        { _id: id },
        { title, content, category, videoUrl },
      );
    } catch (error) {
      console.error(error);
      return res.stauts(400).json(responseMessage(false, '게시글 수정중 에러'));
    }
  },
  deleteBoard: async (id, res) => {
    try {
      const fullBoard = await Board.findById(id).populate('images');
      await Board.findOneAndRemove({ _id: id });

      fullBoard.images.map(async image => {
        let fileName = image.src.split('images/');
        fileName = fileName[1];
        const param = {
          Bucket: 'kohubi-blog/images',
          Key: fileName,
        };
        await removeMulterImage(param);
        await Image.findOneAndRemove({ _id: image.id });
      });
    } catch (error) {
      return res.status(400).json(responseMessage(false, '게시글 삭제중 에러'));
    }
  },
  getBoard: async id => {
    try {
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
      return boardDetail;
    } catch (error) {
      throw Error(error);
    }
  },
};
