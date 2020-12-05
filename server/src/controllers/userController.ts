import { Response } from 'express';
import User, { IUserDocument } from '../models/User';
import { RequestBody } from '../interfaces';
import userService from '../services/userService';
import { IChangePasswordDTO } from '../dto';

const userController = {
    changePasswordPost: async (req: RequestBody<IChangePasswordDTO>, res: Response) => {
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
