import { Request, Response } from 'express';
import User, { IUserDocument } from '../models/User';
import Room, { IRoomDocument } from '../models/Room';
import { RequestBody } from '../interfaces';
import { IRoomCreateDTO } from '../dto';

const roomController = {
    addNewRoomPost: async (req: RequestBody<{ roomCode: string }>, res: Response) => {
        const { id } = req.user as IUserDocument;
        const { roomCode } = req.body;
        const user: IUserDocument | null = await User.findOne({ _id: id }).exec();
        if (!user) {
            throw new Error('User not found');
        }
        const room: IRoomDocument = new Room({ owner: user, roomCode });
        const result: IRoomDocument = await room.save();
        console.log(result);
        res.status(201).send('ok');
    },
};

export default roomController;
