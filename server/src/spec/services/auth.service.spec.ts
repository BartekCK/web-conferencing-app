import faker from 'faker';
import { createToken } from '../../services/authService';

describe('Test auth service', () => {

    it('Should create new token', async () => {
        createToken(faker.internet.ip(), faker.internet.email())
    });

});
