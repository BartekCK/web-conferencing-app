import express from 'express';
import uploadController from '../controllers/uploadController';
import multer from 'multer';
import passportStrategyJWT from '../middlewares/authMiddleware';

const uploadRouter = express.Router();

const upload = multer();

// uploadRouter.get('/users', uploadController.saveUserAvatarPost);
uploadRouter.post('/users', passportStrategyJWT, upload.single('file'), uploadController.saveUserAvatarPost);
uploadRouter.post('/rooms', uploadController.saveRoomAssetPost);

export default uploadRouter;
