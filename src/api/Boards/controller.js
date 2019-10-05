import Board from "../../models/Board";

export default {
    getBoardList: async(req, res) => {
      const { query } = req;
      const { params: {categoryId} } = req;
      const page = query.page ? query.page : 1;
      const pageNum = query.pageNum ? query.pageNum : 10;
      const start = (page - 1) * pageNum;
      const limit = pageNum;
      let totalCount = await Board.find({ category: categoryId });
      totalCount = totalCount.length;
      let boards = null;
      if(query.searchValue === 'undefined') {
        boards = await Board.find({ category: categoryId }).sort({createdAt : 'desc'}).skip(parseInt(start, 10)).limit(parseInt(limit, 10));
        const result = {
          boards,
          totalCount
        }
        return res.status(200).json(result);
      }
      if(query.searchValue !== 'undefined') {
        boards = await Board.find({
          $and: [{
            title: { 
              $regex: '.*' + query.searchValue + '.*' 
            }
          },{
            category: categoryId
          }]
        }).sort({createdAt : 'desc'}).skip(parseInt(start, 10)).limit(parseInt(limit, 10));
        const result = {
          boards,
          totalCount
        }
        return res.status(200).json(result);
      }
    }
}