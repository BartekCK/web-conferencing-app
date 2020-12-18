import fs from 'fs';
import { PUBLIC_PATH } from '../config/constants';
import { IUserDocument } from '../models/User';
import userService from './userService';
import { Resize } from '../utils/Resize';
import { uuid } from 'uuidv4';
import path from 'path';

const uploadService = {
    deleteFile: async (imageServerPath: string) => {
        try {
            await fs.unlinkSync(PUBLIC_PATH + imageServerPath);
        } catch (e) {
            console.log('Error with delete file');
        }
    },

    addUserAvatar: async (userId: string, buffer: any): Promise<IUserDocument> => {
        const user: IUserDocument = await userService.findUser(userId);
        if (user.image) {
            await uploadService.deleteFile(user.image);
        }
        const resize: Resize = new Resize(`/assets/users/${uuid()}.jpeg`);
        const resultPath: string = await resize.save(buffer);
        user.image = resultPath;
        return await user.save();
    },

    addImageToRoom: async (roomCode: string, buffer: any, mimetype: string) => {
        if (mimetype === 'application/pdf') {
            const resultPath = `/assets/rooms/${roomCode}/${uuid()}.pdf`;
            await fs.promises.writeFile(path.join(PUBLIC_PATH, resultPath), buffer, 'binary');
            return { resultPath, type: 'pdf' };
        }
        const resize: Resize = new Resize(`/assets/rooms/${roomCode}/${uuid()}.jpeg`);
        const isExist = await resize.checkIsDirExist(`/assets/rooms/${roomCode}/`);
        if (!isExist) throw new Error('Dir not exist');
        const resultPath: string = await resize.save(buffer);
        return { resultPath, type: 'image' };
    },
};

export default uploadService;
