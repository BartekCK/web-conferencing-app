import { Request, Response } from 'express';
import User, { IUser, IUserDocument } from '../models/User';
import Room, { IRoomDocument } from '../models/Room';
import { RequestBody } from '../interfaces';
import roomService from '../services/roomService';
import userService from '../services/userService';
import { IRoomDTO } from '../dto';

const roomController = {
    addNewRoomPost: async (req: RequestBody<{ roomCode: string }>, res: Response) => {
        const { id } = req.user as IUserDocument;
        const { roomCode } = req.body;
        try {
            const room: IRoomDocument = await roomService.createNewRoom(roomCode, id);
            return res.status(201).send(room);
        } catch (e) {
            return res.status(400).send(e);
        }
    },

    allUserRoomsGet: async (req: Request, res: Response) => {
        const { id } = req.user as IUserDocument;
        try {
            const rooms: IRoomDocument[] = await roomService.getAllUserRooms(id);
            return res.status(200).send(rooms);
        } catch (e) {
            return res.status(400).send(e);
        }
    },

    userRoomDelete: async (req: Request, res: Response) => {
        const { id: userId } = req.user as IUserDocument;
        const { roomId } = req.params;
        try {
            const room: IRoomDocument = await roomService.deleteUserRoom(roomId, userId);
            return res.status(200).send(room);
        } catch (e) {
            return res.status(400).send(e);
        }
    },

    userRoomGet: async (req: Request, res: Response) => {
        const { id: userId } = req.user as IUserDocument;
        const { roomId } = req.params;
        try {
            const room: IRoomDocument = await roomService.getUserRoom(roomId, userId);
            return res.status(200).send({ id: room.id, ...room.toObject() });
        } catch (e: any) {
            return res.status(400).send({ message: e.message });
        }
    },

    userRoomPut: async (req: RequestBody<IRoomDTO>, res: Response) => {
        const { id: userId } = req.user as IUserDocument;
        const { roomId } = req.params;
        try {
            const room: IRoomDocument = await roomService.updateRoom(roomId, userId, req.body);
            return res.status(200).send({ id: room.id, ...room.toObject() });
        } catch (e) {
            return res.status(400).send(e);
        }
    },
};

export default roomController;
