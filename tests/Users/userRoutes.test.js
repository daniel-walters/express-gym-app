import { app } from '../../src/app.js';
import request from 'supertest';
import { deleteUser, signUpUser } from '../../src/Users/userFunctions.js'
import Profile from '../../src/db/models/profileSchema.js';

// connect and use test db
import mongoose from "../../src/db/index.js";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost/test-gym-db");
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('POST /sign-up', () => {
    let response;
    let uid;

    afterEach(async () => {
        await deleteUser(uid);
        await Profile.deleteOne({userId: uid})
    });

    describe('For a gym member', () => {
        beforeEach(async () => {
            response = await request(app).post('/users/sign-up').send({
                email: "testUser@test.com",
                password: "passWord1",
                passwordConfirm: "passWord1",
                membershipNumber: 1234,
                firstName: "Test",
                lastName: "User"
            });
            uid = response.body.userId;
        });
        

        test('should respond with statusCode 201 and add user to database', async () => {  
            expect(response.statusCode).toBe(201);
            expect(response.body.userId).toBeDefined();
        });
    });
});

describe('POST /sign-in', () => {
    let response;
    let uid;
    let newUser;

    afterEach(async () => {
        await deleteUser(uid);
        await Profile.deleteOne({userId: uid})
    })

    test('should respond with statusCode 200 and log in when given valid credentials', async () => {  
        newUser = await signUpUser({email: "testUser@test.com", password: "passWord1", passwordConfirm: "passWord1", membershipNumber: 1234});
        uid = newUser.uid;

        response = await request(app).post('/users/sign-in').send({
            email: "testUser@test.com",
            password: "passWord1"
        });
        console.log("the response for sign-in is:",response.body)

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
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
