import jwt from 'jsonwebtoken';
import { MAX_AGE_SECONDS } from '../config/constants';
import { Response } from 'express';

export const createToken = (id: string) => {
    return jwt.sign({ id }, process.env.SECRET_AUTH_KEY || 'secret', {
        expiresIn: MAX_AGE_SECONDS,
    });
};

export const setCookie = (res: Response, token: string) => {
    res.cookie('jwt', token, { maxAge: MAX_AGE_SECONDS * 1000 });
};
