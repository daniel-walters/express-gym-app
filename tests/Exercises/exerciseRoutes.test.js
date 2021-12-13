import { app } from "../../src/app.js";
import request from "supertest";
import Exercise from "../../src/db/models/exercise";
import { deleteExercise } from "../../src/Exercises/exerciseFunctions.js";
import { nullOrAny } from "../../src/utils/util-functions";

// connect and use test db
import mongoose from "../../src/db/index.js";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost/test-gym-db");
});

afterAll(async () => {
  await mongoose.disconnect();
});

// add customised matcher to jest
expect.extend({ nullOrAny });

describe("Exercises Routes", () => {
  let id;

  afterEach(async () => {
    await deleteExercise(id);
  });

  test("GET /exercises -> should respond with statusCode 200 and get an object of exercises", async () => {
    const exercise = await Exercise.create({
      name: "Deadlift",
      description: "This is deadlift",
      defaultSets: 4,
      defaultReps: 15,
      defaultWeight: 80,
      defaultDistance: null
    });
    id = exercise._id;

    await request(app)
      .get("/exercises")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              description: expect.any(String),
              defaultSets: expect.nullOrAny(Number),
              defaultReps: expect.nullOrAny(Number),
              defaultWeight: expect.nullOrAny(Number),
              defaultDistance: expect.nullOrAny(Number),
            }),
          ])
        );
      });
  });

  test("GET /exercises/:id -> should respond with statusCode 201 and get correct id, name, description, defaultSets, defaultReps,defaultWeight, defaultDistance", async () => {
    const exercise = await Exercise.create({
      name: "Deadlift",
      description: "This is deadlift",
      defaultSets: 4,
      defaultReps: 15,
      defaultWeight: 80,
      defaultDistance: null,
    });
    id = exercise._id;

    await request(app)
      .get("/exercises/" + id)
      .expect(201)
      .then((response) => {
        expect(response.body._id).toBe(exercise.id);
        expect(response.body.name).toBe(exercise.name);
        expect(response.body.description).toBe(exercise.description);
        expect(response.body.defaultSets).toBe(exercise.defaultSets);
        expect(response.body.defaultReps).toBe(exercise.defaultReps);
        expect(response.body.defaultWeight).toBe(exercise.defaultWeight);
        expect(response.body.defaultDistance).toBe(exercise.defaultDistance);
      });
  });

  test("POST/exercises -> should respond with statusCode 201 and add new excersice with id, name, description, defaultSets, defaultReps, defaultWeight, defaultDistance", async () => {
    const exercise = {
      name: "Bench Press",
      description: "This is bench press",
      defaultSets: 5,
      defaultReps: 25,
      defaultWeight: null,
      defaultDistance: null,
    };

    await request(app)
      .post("/exercises")
      .send(exercise)
      .expect(201)
      .then(async (response) => {
        
        id = response.body._id;
        // Check the response
        expect(response.body._id).toBeTruthy();
        expect(response.body.name).toBe(exercise.name);
        expect(response.body.description).toBe(exercise.description);
        expect(response.body.defaultSets).toBe(exercise.defaultSets);
        expect(response.body.defaultReps).toBe(exercise.defaultReps);
        expect(response.body.defaultWeight).toBe(exercise.defaultWeight);
        expect(response.body.defaultDistance).toBe(exercise.defaultDistance);

        // Check the data in the database
        const newExercise = await Exercise.findOne({ _id: response.body._id });
        expect(newExercise.description).toBe(exercise.description);
        expect(newExercise.defaultSets).toBe(exercise.defaultSets);
        expect(newExercise.defaultReps).toBe(exercise.defaultReps);
        expect(newExercise.defaultWeight).toBe(exercise.defaultWeight);
        expect(newExercise.defaultDistance).toBe(exercise.defaultDistance);
      });
  });

  test("PUT /exercise/:id -> should respond with statusCode 200 and update existing excersice with new id, name, description, defaultSets, defaultReps, defaultWeight, defaultDistance", async () => {
    const exercise = await Exercise.create({
      name: "Squat",
      description: "This is a squat",
      defaultSets: 5,
      defaultReps: 20,
      defaultWeight: 25,
      defaultDistance: null,
    });

    const data = {
      name: "Updated title",
      description: "Updated description",
      defaultSets: 4,
      defaultReps: 20,
      defaultWeight: 30,
      defaultDistance: null,
    };

    id = exercise._id;

    await request(app)
      .put("/exercises/" + id)
      .send(data)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body._id).toBe(exercise.id);
        expect(response.body.name).toBe(data.name);
        expect(response.body.description).toBe(data.description);
        expect(response.body.defaultSets).toBe(data.defaultSets);
        expect(response.body.defaultReps).toBe(data.defaultReps);
        expect(response.body.defaultWeight).toBe(data.defaultWeight);
        expect(response.body.defaultDistance).toBe(data.defaultDistance);

        // Check the data in the database
        const newExercise = await Exercise.findOne({ _id: response.body._id });
        expect(newExercise).toBeTruthy();
        expect(newExercise.description).toBe(data.description);
        expect(newExercise.defaultSets).toBe(data.defaultSets);
        expect(newExercise.defaultReps).toBe(data.defaultReps);
        expect(newExercise.defaultWeight).toBe(data.defaultWeight);
        expect(newExercise.defaultDistance).toBe(data.defaultDistance);
      });
  });

  test("DELETE /exercises/:id", async () => {
    const exercise = await Exercise.create({
      name: "test",
      description: "Test data to be deleted",
      defaultSets: 5,
      defaultReps: 20,
      defaultWeight: 25,
      defaultDistance: null,
    });

    id = exercise._id;

    await request(app)
      .delete("/exercises/" + id)
      .expect(200)
      .then(async () => {
        expect(await Exercise.findOne({ _id: id })).toBeFalsy();
      });
  });
});
