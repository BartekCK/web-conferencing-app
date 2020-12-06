import { Document, model, Model, Schema } from 'mongoose';
import User, { IUser, IUserDocument, userSchema } from './User';

export interface IRoom {
    roomName?: string;
    roomCode: string;
    owner: Schema.Types.ObjectId | IUser;
    guests?: IUser[];
}

export interface IRoomDocument extends Document, IRoom {}

const roomSchema = new Schema({
    roomName: {
        type: String,
        required: false,
    },
    roomCode: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    guests: {
        type: [Schema.Types.ObjectId],
        ref: User,
        required: false,
    },
});

export interface IRoomModel extends Model<IRoomDocument> {}

export default model<IRoomDocument, IRoomModel>('room', roomSchema);
