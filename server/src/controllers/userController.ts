import { Response } from 'express';
import User, { IUserDocument } from '../models/User';
import { RequestBody } from '../interfaces';
import { IReqChangePasswordDTO } from '../dto/request';
import userService from '../services/userService';

const userController = {
    changePasswordPost: async (req: RequestBody<IReqChangePasswordDTO>, res: Response) => {
        try {
            const { id } = req.user as IUserDocument;
            await userService.changePassword(req.body, id);
            res.status(201).send('Password changed');
        } catch (e) {
            res.status(400).send(e);
        }
    },
};

export default userController;
