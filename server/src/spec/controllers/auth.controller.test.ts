import { app, server } from '../../server';

const request = require('supertest');

describe("testing-server-routes", () => {

    beforeAll(async () => {

    })

    it("GET /states - success", async () => {
        const res = await request(app).post('/api/signup');
    });

    it("another2", async () => {
        const res = await request(app).post('/api/login');
    });
    it("anothe4r", async () => {
        const res = await request(app).post('/login/token');
    });
});
