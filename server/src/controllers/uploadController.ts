import { Request, Response } from 'express';
import path from 'path';
import { PUBLIC_PATH } from '../config/constants';
import { Resize } from '../utils/Resize';
import userService from '../services/userService';
import { IUserDocument } from '../models/User';
import { uuid } from 'uuidv4';
import uploadService from '../services/uploadService';
import fs from 'fs';

const uploadController = {
    saveUserAvatarPost: async (req: Request, res: Response) => {
        if (!req.file) {
            return res.send('ERROR');
        }
        const { id } = req.user as IUserDocument;
        res.send(await uploadService.addUserAvatar(id, req.file.buffer));
    },

    saveRoomAssetPost: async (req: Request, res: Response) => {
        const { roomId } = req.params;
        if (!req.file) {
            return res.send('ERROR');
        }

        res.send(await uploadService.addImageToRoom(roomId, req.file.buffer));
    },
};

export default uploadController;
