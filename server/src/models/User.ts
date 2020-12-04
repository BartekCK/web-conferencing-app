import { Schema, model, Document, Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

export interface IUser {
    email: string;
    password: string;
}

export interface IUserDocument extends Document, IUser {}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter an email'] as any,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email'] as any,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'] as any,
    },
});

// userSchema.post('save', (doc, next) => {
//     console.log(doc);
//     next(null);
// });

userSchema.pre<IUserDocument>('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next(null);
});

userSchema.static(
    'login',
    async function (this: any, email: string, password: string) {
        const user: IUserDocument = await this.findOne({ email });
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                return user;
            }
            throw new Error('incorrect password');
        }
        throw new Error('incorrect email');
    },
);

export interface UserModel extends Model<IUserDocument> {
    login: (email: string, password: string) => Promise<IUserDocument>;
}

export default model<IUserDocument, UserModel>('user', userSchema);
