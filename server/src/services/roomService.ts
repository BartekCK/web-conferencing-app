import User, { IUserDocument } from '../models/User';
import Room, { IRoomDocument } from '../models/Room';

const roomService = {
    createNewRoom: async (roomCode: string, userId: string): Promise<IRoomDocument> => {
        const user: IUserDocument | null = await User.findOne({ _id: userId }).exec();
        if (!user) {
            throw new Error('User not found');
        }
        return await Room.create({ owner: user.id, roomCode });
    },
};

export default roomService;
