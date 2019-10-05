import express from 'express';
import user from './User';
import board from './Board';
import boards from './Boards';

const apiRoutes = express();

apiRoutes.use('/user', user);
apiRoutes.use('/board', board);
apiRoutes.use('/boards', boards);

export default apiRoutes;