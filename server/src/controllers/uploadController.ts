import { Request, Response } from 'express';
import path from 'path';
import { PUBLIC_PATH } from '../config/constants';
import { Resize } from '../utils/Resize';
import userService from '../services/userService';
import { IUserDocument } from '../models/User';

const uploadController = {
    saveUserAvatarPost: async (req: Request, res: Response) => {
        if (!req.file) {
            return res.send('ERROR');
        }
        const { id } = req.user as IUserDocument;
        const user: IUserDocument = await userService.findUser(id);
        const resize: Resize = new Resize(`/assets/users/${user.id}.png`);
        const resultPath: string = await resize.save(req.file.buffer);
        user.image = resultPath;
        res.send(await user.save());
    },

    saveRoomAssetPost: (req: Request, res: Response) => {
        res.send('Hello world ROOM');
    },
};

export default uploadController;
