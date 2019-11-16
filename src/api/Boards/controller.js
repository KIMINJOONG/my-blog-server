import Board from '../../models/Board';
import BoardsService from './service';

export default {
  getBoardList: async (req, res) => {
    const { query } = req;
    const {
      params: { categoryId },
    } = req;

    try {
      const response = await BoardsService.getBoardList(query, categoryId);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
