import passport from 'passport';
import { Request } from 'express';
import { Strategy as FacebookStrategy } from 'passport-facebook';
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

const facebookStrategy = passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID || 'secret',
            clientSecret: process.env.FACEBOOK_APP_SECRET || 'secret',
            callbackURL: process.env.SERVER_DOMAIN + '/login/facebook',
        },
        function (accessToken, refreshToken, profile, done) {
            return done(null, profile);
        },
    ),
);

export default passportStrategyJWT.authenticate('jwt', { session: false });
