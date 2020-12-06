import User, { IUser, IUserDocument } from '../models/User';
import Room, { IRoomDocument } from '../models/Room';
import userService from './userService';
import { IRoomDTO } from '../dto';

const roomService = {
    createNewRoom: async (roomCode: string, userId: string): Promise<IRoomDocument> => {
        const user: IUserDocument | null = await User.findOne({ _id: userId }).exec();
        if (!user) {
            throw new Error('User not found');
        }
        return await Room.create({ owner: user.id, roomCode });
    },

    getAllUserRooms: async (userId: string): Promise<IRoomDocument[]> => {
        const user: IUserDocument = await userService.findUser(userId);
        return await Room.find({ owner: user.id }).select('id roomName roomCode').exec();
    },

    getUserRoom: async (roomId: string, userId: string): Promise<IRoomDocument> => {
        const room: IRoomDocument | null = await Room.findOne({ _id: roomId, owner: userId })
            .populate('owner')
            .populate('guests')
            .exec();
        if (!room) {
            throw new Error('Room not found');
        }
        return room;
    },

    deleteUserRoom: async (roomId: string, userId: string): Promise<IRoomDocument> => {
        return await Room.deleteOne({ _id: roomId, owner: userId }).exec();
    },

    updateRoom: async (roomId: string, userId: string, data: IRoomDTO): Promise<IRoomDocument> => {
        const room: IRoomDocument = await roomService.getUserRoom(roomId, userId);
        const { guests, roomName } = data;
        room.roomName = roomName || room.roomName;
        room.guests = guests || room.guests;
        return await room.save();
    },
};

export default roomService;
