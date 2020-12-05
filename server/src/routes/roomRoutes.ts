import { Router } from 'express';
import roomController from '../controllers/roomController';
import passportStrategyJWT from '../middlewares/authMiddleware';

const roomRouter: Router = Router();

roomRouter.post('/', passportStrategyJWT, roomController.addNewRoomPost);

export default roomRouter;
