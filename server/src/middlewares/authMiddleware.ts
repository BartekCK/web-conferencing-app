import passport from 'passport';
import { Request } from 'express';
import { Strategy, VerifiedCallback } from 'passport-jwt';
import * as dotenv from 'dotenv';
import { IToken } from '../interfaces';
import User, { IUserDocument } from '../models/User';
dotenv.config();

const cookieExtractor = (req: Request) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};

const passportStrategyJWT = passport.use(
    new Strategy(
        {
            secretOrKey: process.env.SECRET_AUTH_KEY || 'secret',
            jwtFromRequest: cookieExtractor,
        },
        async (jwt_payload: IToken, done: VerifiedCallback) => {
            try {
                const user: IUserDocument | null = await User.findOne({
                    _id: jwt_payload.id,
                });
                return done(null, user);
            } catch (err) {
                return done(err, false);
            }
        },
    ),
);

export default passportStrategyJWT.authenticate('jwt', { session: false })
