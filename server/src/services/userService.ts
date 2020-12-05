import User, { IUser, IUserDocument } from '../models/User';

const userService = {
    createUser: async (newUser: IUser): Promise<IUserDocument> => {
        const user = new User(newUser);
        return await user.save();
    },
};

export default userService;
