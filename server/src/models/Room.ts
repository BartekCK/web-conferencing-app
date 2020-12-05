import { Document, model, Model, Schema } from 'mongoose';
import { IUser, IUserDocument, userSchema } from './User';

export interface IRoom {
    roomName: string,
    roomCode: string
    owner: IUser,
    guests: IUser[],
}

export interface IRoomDocument extends Document, IRoom {}

const roomSchema = new Schema({
    roomName: String,
    roomCode: {
        type: String,
        required: true,
    },
    owner: userSchema,
    guests: [userSchema],
});

export interface IRoomModel extends Model<IRoomDocument> {
}

export default model<IRoomDocument, IRoomModel>('room', roomSchema)
