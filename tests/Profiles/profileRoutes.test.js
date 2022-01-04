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

    beforeEach(async() => {
        profile = await Profile.create({
            userId: "bXLOgQo9HMcARXHXcy2sNEyVOM82",
            firstName: "John",
            lastName: "Doe",
            isStaff: true,
            description: "Test user profile",
            weight: 65,
            checkedIn: false,
            workouts: [
                {
                  name: "Day 1 Workout",
                  exercises: [
                    {
                      exerciseId: "6188d363ee05ab76027e33cf",
                      sets: 4,
                      reps: 15,
                      weight: 100,
                      distance: 0,
                    },
                    {
                        exerciseId: "61b817a39843d60b210b04eb",
                        sets: 3,
                        reps: 15,
                        weight: 120,
                        distance: 0,
                      },
                  ],
                },
                {
                    name: "Day 2 Workout",
                    exercises: [
                      {
                        exerciseId: "6188d363ee55ab76027e33cf",
                        sets: 5,
                        reps: 20,
                        weight: 100,
                        distance: 0,
                      },
                      {
                          exerciseId: "61b817a39844d60b210b04eb",
                          sets: 4,
                          reps: 15,
                          weight: 140,
                          distance: 0,
                        },
                    ],
                  },
              ],
        })
        profile = JSON.parse(JSON.stringify(profile));
        uid = profile.userId;
    })

    afterEach(async () => {
        await deleteProfile(uid);
    });

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
                expect(response.body.description).toBe(profile.description);
                expect(response.body.weight).toBe(profile.weight);
                expect(response.body.checkedIn).toBe(profile.checkedIn);
                expect(response.body.workouts).toEqual(profile.workouts);
            })
    })


    test("PUT /profiles/:uid -> should respond with statusCode 200 and update existing user's profile", async () => {
        let data = {
            userId: "bXLOgQo9HMcARXHXcy2sNEyVOM82",
            firstName: "John",
            lastName: "Doe",
            isStaff: true,
            description: "Test user profile",
            weight: 65,
            checkedIn: false,
            workouts: [
                {
                  name: "Day 1 Amended Workout",
                  exercises: [
                    {
                      exerciseId: "6188d363ee05ab76027e33cf",
                      sets: 0,
                      reps: 0,
                      weight: 0,
                      distance: 80000,
                    },
                    {
                        exerciseId: "61b817a39843d60b210b04eb",
                        sets: 3,
                        reps: 15,
                        weight: 120,
                        distance: 0,
                      },
                  ],
                },
                {
                    name: "Day 2 Amended Workout",
                    exercises: [
                      {
                        exerciseId: "6188d363ee55ab76027e33cf",
                        sets: 5,
                        reps: 15,
                        weight: 120,
                        distance: 0,
                      },
                      {
                          exerciseId: "61b817a39844d60b210b02eb",
                          sets: 0,
                          reps: 0,
                          weight: 0,
                          distance: 10000,
                        },
                    ],
                  },
              ],
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
            expect(response.body.isStaff).toBe(data.isStaff);
            expect(response.body.description).toBe(data.description);
            expect(response.body.weight).toBe(data.weight);
            expect(response.body.checkedIn).toBe(data.checkedIn);

            //check workout array in reponse
            for (let i = 0; i < response.body.workouts.length; i++) {
                expect(response.body.workouts[i].name).toBe(data.workouts[i].name);
                //check exercise array in workout response
                for (let j = 0; j < response.body.workouts[i].exercises.length; j++){
                    expect(response.body.workouts[i].exercises[j].sets).toBe(data.workouts[i].exercises[j].sets)
                    expect(response.body.workouts[i].exercises[j].reps).toBe(data.workouts[i].exercises[j].reps)
                    expect(response.body.workouts[i].exercises[j].weight).toBe(data.workouts[i].exercises[j].weight)
                    expect(response.body.workouts[i].exercises[j].distance).toBe(data.workouts[i].exercises[j].distance)
                }
            }

            // Check the data in the database
            let updatedData = await Profile.findOne({userId: uid});
            updatedData = JSON.parse(JSON.stringify(updatedData));

            expect(updatedData._id).toBeTruthy();
            expect(updatedData.firstName).toBe(data.firstName);
            expect(updatedData.lastName).toBe(data.lastName);
            expect(updatedData.weight).toBe(data.weight);
            expect(updatedData.description).toBe(data.description);
            expect(updatedData.checkedIn).toBe(data.checkedIn);


             //check workout array in reponse
             for (let i = 0; i < updatedData.workouts.length; i++) {
                expect(updatedData.workouts[i].name).toBe(data.workouts[i].name);
                //check exercise array in workout response
                for (let j = 0; j < updatedData.workouts[i].exercises.length; j++){
                    expect(updatedData.workouts[i].exercises[j].sets).toBe(data.workouts[i].exercises[j].sets)
                    expect(updatedData.workouts[i].exercises[j].reps).toBe(data.workouts[i].exercises[j].reps)
                    expect(updatedData.workouts[i].exercises[j].weight).toBe(data.workouts[i].exercises[j].weight)
                    expect(updatedData.workouts[i].exercises[j].distance).toBe(data.workouts[i].exercises[j].distance)
                }
            }
        })
    })


    test("PUT /profiles/:uid -> should respond with error message when updating userId or staff status", async () => {
        let data = {
            userId: "12345",
            firstName: "A",
            lastName: "Name",
            isStaff: true,
            description: "Test user profile",
            weight: 68,
            checkedIn: false,
            workouts: [],
        }
        data = JSON.parse(JSON.stringify(data));

        await request(app)
        .put("/profiles/" + uid)
        .send(data)
        .then(async (response) => {
            expect(response.body.error).toEqual('You are not autorised to edit user id or staff status' );
        }) 
    })
})