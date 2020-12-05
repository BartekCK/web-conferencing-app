import User, { IUser, IUserDocument } from '../models/User';
import { IReqChangePasswordDTO } from '../dto/request';
import bcrypt from 'bcrypt';

const userService = {
    createUser: async (newUser: IUser): Promise<IUserDocument> => {
        const user = new User(newUser);
        return await user.save();
    },
    changePassword: async (credentials: IReqChangePasswordDTO, userId: string): Promise<void> => {
        const { newPassword, currentPassword }: IReqChangePasswordDTO = credentials;
        const user: IUserDocument | null = await User.findOne({ _id: userId });
        if (!user) {
            throw new Error('Error');
        }
        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordCorrect) {
            throw new Error('Password is incorrect');
        }
        user.password = newPassword;
        await user.save();
    },
};

export default userService;
