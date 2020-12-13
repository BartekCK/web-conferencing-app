import express from 'express';
import uploadController from '../controllers/uploadController';
import multer from 'multer';
import passportStrategyJWT from '../middlewares/authMiddleware';

const uploadRouter = express.Router();

const upload = multer();

uploadRouter.post('/users', passportStrategyJWT, upload.single('file'), uploadController.saveUserAvatarPost);
uploadRouter.post('/rooms/:roomId', upload.single('file'), uploadController.saveRoomAssetPost);

export default uploadRouter;
