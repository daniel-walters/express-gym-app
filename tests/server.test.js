import { app } from '../src/app.js';
import request from 'supertest';

describe('GET /', () => {
    let response;
    beforeEach(async () => {
        response = await request(app).get('/');
    });

    test('reponds with status 200', () => {
        expect(response.statusCode).toBe(200);
    });

    test('responds with JSON', () => {
        expect(response.type).toMatch('application/json');
    });
    
    test('responds with correct Body', () => {
        const expectedBody = { placeholder: 'Express Gym App' };
        expect(response.body).toEqual(expectedBody);
    })
})