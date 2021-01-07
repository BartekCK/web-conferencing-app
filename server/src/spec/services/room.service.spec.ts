import userService from '../../services/userService';
import faker from 'faker';
import connectDatabase from '../../config/database';
import * as mongoose from 'mongoose';
import roomService from '../../services/roomService';

describe('Test room service', () => {
    let email: any;
    const password = faker.internet.password();
    const roomCode = faker.lorem.slug();

    let user: any;
    let room: any;

    beforeAll(async () => {
        await connectDatabase();
        email = faker.internet.email();
        user = await userService.createUser({ email, password });
    });

    it('Should create new user room', async () => {
        room = await roomService.createNewRoom(roomCode, user._id);
        expect(room.roomCode === roomCode)
    });

    it('Should find all user rooms', async () => {
        await roomService.getAllUserRooms(user._id);
    });

    it('Should find user room', async () => {
        await roomService.getUserRoom(room._id, user._id);
    });

    it('Should update user room', async () => {
        const result = await roomService.updateRoom(room._id, user._id, {roomName: roomCode, guests: []});
    });

    it('Should add user to conversation', async () => {
        const newUser: any = await userService.createUser({ email: faker.internet.email(), password });
        const result = await roomService.addUserToConversation(newUser._id, newUser._id, newUser.email, roomCode );
    });

    it('Should delete user from conversation', async () => {
        const newUser: any = await userService.createUser({ email: faker.internet.email(), password });
      await roomService.removeUserFromConversation(newUser._id, newUser._id, newUser.email, roomCode );
    });

    it('Should remove room', async () => {
        const result = await roomService.deleteUserRoom(room._id, user._id);
    });

    afterAll(()=>{
        mongoose.connection.close()
    })
});
