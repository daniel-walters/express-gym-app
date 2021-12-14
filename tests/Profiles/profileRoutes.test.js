import { app } from "../../src/app.js";
import request from "supertest";
import Profile from "../../src/db/models/profileSchema.js";


// connect and use test db
import mongoose from "../../src/db/index.js";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost/test-gym-db");
});

afterAll(async () => {
  await mongoose.disconnect();
});

async function deleteProfile(uid) {
    let profile = await Profile.deleteOne({ userId: uid });
    return profile
};

describe("Profile Routes", () => {
    let uid, profile;

    afterEach(async () => {
        await deleteProfile(uid);
    });

    beforeEach(async() => {
        profile = await Profile.create({
            userId: "bXLOgQo9HMcARXHXcy2sNEyVOM82",
            firstName: "John",
            lastName: "Doe",
            isStaff: true,
            weight: 65,
            workouts: ["6188d363ee05ab76027e33cf","61b817a39843d60b210b04eb"],
            events:["61b817a4dd104ff23bbad2cd"]
        })
        profile = JSON.parse(JSON.stringify(profile));
        uid = profile.userId;
    })

    test("GET /profiles/:uid -> should respond with statusCode 201 and get correct a profile object", async () => {
     
        await request(app)
            .get("/profiles/"+ uid)
            .expect(201)
            .then((response) => {
                expect(response.body._id).toBe(profile._id);
                expect(response.body.userId).toBe(profile.userId);
                expect(response.body.firstName).toBe(profile.firstName);
                expect(response.body.lastName).toBe(profile.lastName);
                expect(response.body.isStaff).toBe(profile.isStaff);
                expect(response.body.weight).toBe(profile.weight);
                expect(response.body.workouts).toEqual(profile.workouts);
                expect(response.body.events).toEqual(profile.events);
            })
    })


    test("PUT /profiles/:uid -> should respond with statusCode 200 and update existing user's profile", async () => {
        let data = {
            userId: "bXLOgQo9HMcARXHXcy2sNEyVOM82",
            firstName: "A",
            lastName: "Name",
            isStaff: true,
            weight: 68,
            workouts: ["6188d363ee05ab76027e33cf","61b817a39843d60b210b04eb"],
            events:[]
        }
        data = JSON.parse(JSON.stringify(data));

        await request(app)
        .put("/profiles/" + uid)
        .send(data)
        .expect(200)
        .then(async (response) => {
            // Check the response
            expect(response.body._id).toBe(profile._id);
            expect(response.body.firstName).toBe(data.firstName);
            expect(response.body.lastName).toBe(data.lastName);
            expect(response.body.weight).toBe(data.weight);
            expect(response.body.workouts).toEqual(data.workouts);
            expect(response.body.events).toEqual(data.events);

            // Check the data in the database
            let updatedData = await Profile.findOne({userId: uid});
            updatedData = JSON.parse(JSON.stringify(updatedData));

            expect(updatedData._id).toBeTruthy();
            expect(updatedData.firstName).toBe(data.firstName);
            expect(updatedData.lastName).toBe(data.lastName);
            expect(updatedData.weight).toBe(data.weight);
            expect(updatedData.workouts).toEqual(data.workouts);
            expect(updatedData.events).toEqual(data.events);
        })
    })


    test("PUT /profiles/:uid -> should respond with statusCode 422 when updating userId or staff status", async () => {
        let data = {
            userId: "12345",
            firstName: "A",
            lastName: "Name",
            isStaff: true,
            weight: 68,
            workouts: ["6188d363ee05ab76027e33cf","61b817a39843d60b210b04eb"],
            events:[]
        }
        data = JSON.parse(JSON.stringify(data));

        await request(app)
        .put("/profiles/" + uid)
        .send(data)
        .expect(422)
        .then(async (response) => {
            expect(response.body.message).toEqual('You are not autorised to edit user id or staff status' );
        }) 
    })
})