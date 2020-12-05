import { Response, Request } from 'express';
import { RequestBody } from '../interfaces';
import userService from '../services/userService';
import { LoginDTO, UserDTO } from '../dto';
import jwt from 'jsonwebtoken';
import { MAX_AGE_SECONDS } from '../config/constants';
import User, { IUserDocument } from '../models/User';
import { createToken, setCookie } from '../services/authService';
import { IResUserDTO } from '../dto/response';

const authController = {
    signupGet: (req: Request, res: Response) => {
        res.send('Hello world');
    },
    signupPost: async (req: RequestBody<UserDTO>, res: Response) => {
        const { email, password } = req.body;
        try {
            const user: IUserDocument = await userService.createUser(
                email,
                password,
            );
            const token = createToken(user.id);
            res.cookie('jwt', token, { maxAge: MAX_AGE_SECONDS * 1000 });
            res.send(user);
        } catch (e) {
            res.send(e);
        }
    },

    loginGet: (req: Request, res: Response) => {
        res.send('Hello world');
    },

    loginPost: async (req: RequestBody<LoginDTO>, res: Response<IResUserDTO>) => {
        const { email: emailBody, password } = req.body;
        try {
            const user: IUserDocument = await User.login(emailBody, password);
            const token: string = createToken(user.id);
            setCookie(res, token);
            const { id, email } = user;
            res.send({ id, email });
        } catch (e) {
            res.status(400).send(e);
        }
    },
};

export default authController;
