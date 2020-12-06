import { Request, Response } from 'express';
import User, { IUserDocument } from '../models/User';
import Room, { IRoomDocument } from '../models/Room';
import { RequestBody } from '../interfaces';
import roomService from '../services/roomService';

const roomController = {
    addNewRoomPost: async (req: RequestBody<{ roomCode: string }>, res: Response) => {
        const { id } = req.user as IUserDocument;
        const { roomCode } = req.body;
        try {
            const room: IRoomDocument = await roomService.createNewRoom(roomCode, id);
            res.status(201).send(room);
        } catch (e) {
            res.status(400).send(e);
        }
    },
};

export default roomController;
