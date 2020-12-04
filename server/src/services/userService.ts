import User, { IUserDocument } from '../models/User';

const userService = {
    createUser: async (email: string, password: string): Promise<IUserDocument> => {
        const user = new User({ email, password });
        return await user.save();
    },
};

export default userService;
