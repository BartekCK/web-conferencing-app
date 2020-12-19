import User, { IUser, IUserDocument } from '../models/User';
import Room, { IRoomDocument } from '../models/Room';
import userService from './userService';
import { IRoomDTO } from '../dto';
import fs from 'fs';
import { PUBLIC_PATH } from '../config/constants';
import { Types } from 'mongoose';

const roomService = {
    createNewRoom: async (roomCode: string, userId: string): Promise<IRoomDocument> => {
        const user: IUserDocument | null = await User.findOne({ _id: userId }).exec();
        if (!user) {
            throw new Error('User not found');
        }
        await fs.promises.mkdir(`${PUBLIC_PATH}/assets/rooms/${roomCode}`, { recursive: true });
        return await Room.create({ owner: user.id, roomCode, guests: [], currentUsers: [] });
    },

    getAllUserRooms: async (userId: string): Promise<IRoomDocument[]> => {
        const user: IUserDocument = await userService.findUser(userId);
        return await Room.find({ owner: user.id }).select('id roomName roomCode').exec();
    },

    getUserRoom: async (roomId: string, userId: string): Promise<IRoomDocument> => {
        const returnArr = () =>
            Types.ObjectId.isValid(roomId) ? [{ _id: roomId }, { roomCode: roomId }] : [{ roomCode: roomId }];
        const room: IRoomDocument | null = await Room.findOne({
            // owner: userId,
            $or: returnArr(),
        })
            .populate('owner')
            .populate('guests')
            .exec();
        if (!room) {
            throw new Error('Room not found');
        }
        const roomObject: any = room.toObject({ aliases: true });
        if (roomObject.owner._id == userId || roomObject.guests.some((user: any) => user._id == userId)) {
            return room;
        }
        throw new Error('This user do not have access');
    },

    deleteUserRoom: async (roomId: string, userId: string): Promise<IRoomDocument> => {
        return await Room.deleteOne({ _id: roomId, owner: userId }).exec();
    },

    updateRoom: async (roomId: string, userId: string, data: IRoomDTO): Promise<IRoomDocument> => {
        const { guests, roomName } = data;
        const room: IRoomDocument = await roomService.getUserRoom(roomId, userId);
        room.roomName = roomName || room.roomName;
        room.guests = guests || room.guests;
        const result = await room.save();
        return await result.populate('guests').populate('owner').execPopulate();
    },

    addUserToConversation: async (
        userId: string,
        socketId: string,
        email: string,
        roomCode: string,
        userImage?: string,
    ): Promise<IRoomDocument> => {
        const room: IRoomDocument = await roomService.getUserRoom(roomCode, userId);
        room.currentUsers.push({ userId, socketId, email, userImage });
        return await room.save();
    },

    removeUserFromConversation: async (
        userId: string,
        socketId: string,
        email: string,
        roomCode: string,
    ): Promise<IRoomDocument> => {
        const room: IRoomDocument = await roomService.getUserRoom(roomCode, userId);
        room.currentUsers = room.currentUsers.filter((el: any) => el.socketId !== socketId)
        return await room.save();
    },
};

export default roomService;
