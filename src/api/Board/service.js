import Board from '../../models/Board';
import Image from '../../models/Image';
import Comment from '../../models/Comment';
export default {
  insertBoard: async (title, content, category, fileUrls, videoUrl) => {
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
      next(e);
    }
  },
  updateBoard: async (title, content, category, videoUrl, id) => {
    try {
      await Board.findOneAndUpdate(
        { _id: id },
        { title, content, category, videoUrl },
      );
    } catch (error) {
      throw Error(error);
    }
  },
  deleteBoard: async id => {
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
      throw Error(error);
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
