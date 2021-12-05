import { app } from '../../src/app.js';
import request from 'supertest';
import { deleteUser, signUpUser } from '../../src/Users/userFunctions.js'

describe('POST /sign-up', () => {
    let response;
    let uid;

    afterEach(async () => {
        await deleteUser(uid);
    });

    describe('For a gym member', () => {
        beforeEach(async () => {
            response = await request(app).post('/users/sign-up').send({
                email: "testUser@test.com",
                password: "passWord1",
                passwordConfirm: "passWord1",
                membershipNumber: 1234
            });
            uid = response.body.uid;
        });

        test('should respond with statusCode 201 and add user to database', async () => {  
            expect(response.statusCode).toBe(201);
            expect(response.body.uid).toBeDefined();
        });
    });
});

describe('POST /sign-in', () => {
    let response;
    let uid;
    let newUser;

    afterEach(async () => {
        await deleteUser(uid);
    })

    test('should respond with statusCode 200 and log in when given valid credentials', async () => {  
        newUser = await signUpUser({email: "testUser@test.com", password: "passWord1", passwordConfirm: "passWord1", membershipNumber: 1234});
        uid = newUser.uid;

        response = await request(app).post('/users/sign-in').send({
            email: "testUser@test.com",
            password: "passWord1"
        });

        expect(response.statusCode).toBe(200);
        expect(response.body.uid).toBeDefined();
    });

    test('should respond with status code 401 and error when given invalid credentials', async () => {
        newUser = await signUpUser({email: "testUser@test.com", password: "passWord1", passwordConfirm: "passWord1", membershipNumber: 1234});
        uid = newUser.uid;

        response = await request(app).post('/users/sign-in').send({
            email: "testUser@test.com",
            password: "notapassword"
        });

        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBeDefined();
    });
});
