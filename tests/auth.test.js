const request = require('supertest');
const app = require('../app');

const mongoose = require('mongoose');

const config = require('config');

jest.setTimeout(30000);

beforeAll(async () =>{
    await mongoose.connect("mongodb+srv://Aditya_backend:Aditya_1007@cluster0.owdjoy3.mongodb.net/project1?appName=Cluster0");
})


afterAll(async() => {
    await mongoose.connection.close();
});

describe('Auth Routes', () => {

    test('POST /users/register - should register a new user', async () => {
        const res = await request(app)
            .post('/users/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'Test@1234'
            });
        expect(res.statusCode).toBe(201);
    });

    test('POST /users/login - should login with correct credentials', async () => {
        const res = await request(app)
            .post('/users/login')
            .send({
                email: 'test@example.com',
                password: 'Test@1234'
            });
        expect(res.statusCode).toBe(200);
    });

    test('POST /users/login - should fail with wrong password', async () => {
        const res = await request(app)
            .post('/users/login')
            .send({
                email: 'test@example.com',
                password: 'wrongpassword'
            });
        expect(res.statusCode).toBe(401);
    });

});