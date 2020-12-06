import { Router } from 'express';
import roomController from '../controllers/roomController';
import passportStrategyJWT from '../middlewares/authMiddleware';

const roomRouter: Router = Router();

roomRouter.post('/', passportStrategyJWT, roomController.addNewRoomPost);
roomRouter.get('/', passportStrategyJWT, roomController.allUserRoomsGet);
roomRouter.get('/:roomId', passportStrategyJWT, roomController.userRoomGet);
roomRouter.delete('/:roomId', passportStrategyJWT, roomController.userRoomDelete);
roomRouter.put('/:roomId', passportStrategyJWT, roomController.userRoomPut);

export default roomRouter;
