import { Response, Request } from 'express';
import { RequestBody } from '../interfaces';
import userService from '../services/userService';
import { LoginDTO, UserDTO } from '../dto';
import jwt from 'jsonwebtoken';
import { MAX_AGE_SECONDS } from '../config/constants';
import User, { IUserDocument } from '../models/User';
import { createToken, setCookie } from '../services/authService';
import { IResUserDTO } from '../dto/response';
import { IReqUserFacebookDTO } from '../dto/request';

const authController = {
    signupPost: async (req: RequestBody<UserDTO>, res: Response) => {
        const { email, password, phone } = req.body;
        try {
            await userService.createUser({
                email,
                password,
                phone,
            });
            res.status(201).send('User created');
        } catch (e) {
            res.status(400).send(e);
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
            const { id, email, image } = user;
            res.send({ id, email, image });
        } catch (e) {
            res.status(400).send(e);
        }
    },

    loginByTokenPost: async (req: RequestBody<any>, res: Response<any>) => {
        if (req.user) {
            const { id, email, image, phone } = req.user as IUserDocument;
            res.send({ id, email, image, phone });
        }
        res.status(401).send();
    },

    loginFacebookPost: async (
        req: RequestBody<IReqUserFacebookDTO>,
        res: Response<IResUserDTO>,
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
            res.send({
                id: user.id,
                email: user.email,
                image: user.image,
                phone: user.phone,
            }).status(200);
        } catch (e) {
            res.send(e).status(400);
        }
    },
};

export default authController;
