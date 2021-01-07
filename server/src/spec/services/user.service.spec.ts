import userService from '../../services/userService';
import faker from 'faker';
import connectDatabase from '../../config/database';
import User from '../../models/User';
import * as mongoose from 'mongoose';

describe('Test user service', () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    beforeAll(async () => {
        await connectDatabase();
    });

    it('Should create new user', async () => {
        await userService.createUser({ email, password });
        console.log(email);
    });

    it('Should change user password', async () => {
        const user: any = await User.findOne({email});
        await userService.changePassword({currentPassword: password, newPassword: "123"}, user._id);
    });

    it('Should find user', async () => {
        const user: any = await User.findOne({email});
        await userService.findUser(user._id);
    });

    it('Should find by email', async () => {
        const user: any = await User.findOne({email});
        await userService.findUserByEmail(user.email);
    });

    it('Should find user by email in all places', async () => {
        const user: any = await User.findOne({email});
        await userService.findUsersByEmail(user.email);
    });

    afterAll(()=>{
        mongoose.connection.close()
    })
});
