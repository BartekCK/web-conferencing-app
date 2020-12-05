import { Response, Request } from 'express';
import { RequestBody } from '../interfaces';
import userService from '../services/userService';
import { LoginDTO, UserDTO } from '../dto';
import jwt from 'jsonwebtoken';
import { MAX_AGE_SECONDS } from '../config/constants';
import User, { IUserDocument } from '../models/User';
import { createToken, setCookie } from '../services/authService';
import { IResUserDTO } from '../dto/response';
import { IUserFacebookDTO } from '../dto/request';

const authController = {
    signupPost: async (req: RequestBody<UserDTO>, res: Response) => {
        const { email, password, phone } = req.body;
        try {
            const user: IUserDocument = await userService.createUser({
                email,
                password,
                phone,
            });
            const token = createToken(user.id, user.email);
            res.cookie('jwt', token, { maxAge: MAX_AGE_SECONDS * 1000 });
            res.send(user);
        } catch (e) {
            res.send(e);
        }
    },

    testAuthGet: (req: Request, res: Response) => {
        res.send('Hello world');
    },

    loginPost: async (req: RequestBody<LoginDTO>, res: Response<IResUserDTO>) => {
        const { email: emailBody, password } = req.body;
        try {
            const user: IUserDocument = await User.login(emailBody, password);
            const token: string = createToken(user.id, user.email);
            setCookie(res, token);
            const { id, email } = user;
            res.send({ id, email });
        } catch (e) {
            res.status(400).send(e);
        }
    },

    loginFacebookPost: async (
        req: RequestBody<IUserFacebookDTO>,
        res: Response<any>,
    ) => {
        const { id, email } = req.body;
        try {
            let user: IUserDocument | null = await User.findOne({
                $or: [{ facebookUserID: id }, { email }],
            });
            if (!user) {
                user = await userService.createUser({
                    password: id,
                    facebookUserID: id,
                    email,
                });
            }
            const token: string = createToken(user.id, user.email);
            setCookie(res, token);
            res.send({ id: user.id, email: user.email }).status(200);
        } catch (e) {
            res.send(e).status(400);
        }
    },
};

export default authController;
