import { app } from "../../src/app.js";
import request from "supertest";
import Workout from "../../src/db/models/workout";
import { deleteWorkout } from "../../src/Workouts/workoutFunctions.js";

// connect and use test db 
import mongoose from "../../src/db/index.js"

beforeAll( async () => {
  await mongoose.connect('mongodb://localhost/test-gym-db');
})

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Workouts Routes", () => {
  let id;

  afterEach(async () => {
    await deleteWorkout(id);
  });

  // test for get /workouts
  test("GET /workouts -> should respond with statusCode 200 and get an array of workouts", async () => {
    const workout = await Workout.create({
      exercises: [
        {
          exercise_id: "6188d363ee05ab76027e33cf",
          sets: 4,
          reps: 20,
          weight: 40,
          distance: null,
        },
      ],
    });
    id = workout._id;
    const workouts = await Workout.find({});

    await request(app)
      .get("/workouts")
      .expect(200)
      .then((response) => {
        // Check the response type and length
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(workouts.length);

        // Check the response data
        expect(response.body[workouts.length - 1]._id).toBe(workout.id);
        expect(response.body[workouts.length - 1].sets).toBe(workout.sets);
        expect(response.body[workouts.length - 1].reps).toBe(workout.reps);
        expect(response.body[workouts.length - 1].weight).toBe(workout.weight);
        expect(response.body[workouts.length - 1].distance).toBe(
          workout.distance
        );
      });
  });

  // test for get /workouts/:id
  test(" GET /workouts/:id -> should respond with statusCode 201 and get an correct id, sets, reps and weight", async () => {
    const workout = await Workout.create({
      exercises: [
        {
          exercise_id: "6188d363ee05ab76027553cf",
          sets: 3,
          reps: 12,
          weight: 100,
          distance: null,
        },
      ],
    });
    id = workout._id;

    await request(app)
      .get("/workouts/" + id)
      .expect(201)
      .then((response) => {
        expect(response.body._id).toBe(workout.id);
        expect(response.body.sets).toBe(workout.sets);
        expect(response.body.reps).toBe(workout.reps);
        expect(response.body.weight).toBe(workout.reps);
        expect(response.body.distance).toBe(workout.distance);
      });
  });

  // test for post /workouts
  test("POST/workouts -> should respond with statusCode 201 and add new workout with correct sets, reps and weight value", async () => {
    const newWorkout = {
      exercises: [
        {
          exercise_id: "6188d363ee05ab76027e44cf",
          sets: 5,
          reps: 25,
          weight: 70,
          distance: null,
        },
      ],
    };

    await request(app)
      .post("/workouts")
      .send(newWorkout)
      .expect(201)
      .then(async (response) => {
        // Check the response
        expect(response.body._id).toBeTruthy();
        expect(response.body.sets).toBe(newWorkout.sets);
        expect(response.body.reps).toBe(newWorkout.reps);
        expect(response.body.weight).toBe(newWorkout.weight);
        id = response.body._id;

        // Check the data in the database
        const workout = await Workout.findOne({ _id: response.body._id });
        expect(workout).toBeTruthy();
        expect(workout.sets).toBe(newWorkout.sets);
        expect(workout.reps).toBe(newWorkout.reps);
        expect(workout.weight).toBe(newWorkout.weight);
      });
  });

  // test for put /workouts:id
  test("PUT /workouts/:id -> should respond with statusCode 200 and update workout with correct sets, reps and weight value", async () => {
    const workout = await Workout.create({
      exercises: [
        {
          exercise_id: "6188d363ee05ab76027e44cc",
          sets: 4,
          reps: 15,
          weight: 100,
          distance: null,
        },
      ],
    });

    const data = {
      exercises: [
        {
          sets: 3,
          reps: 15,
          weight: 120,
          distance: null,
        },
      ],
    };

    id = workout._id;

    await request(app)
      .put("/workouts/" + workout.id)
      .send(data)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body._id).toBe(workout.id);
        expect(response.body.sets).toBe(data.sets);
        expect(response.body.reps).toBe(data.reps);
        expect(response.body.weight).toBe(data.weight);
        expect(response.body.distance).toBe(data.distance);

        // Check the data in the database
        const newWorkout = await Workout.findOne({ _id: response.body._id });
        expect(newWorkout).toBeTruthy();
        expect(newWorkout.sets).toBe(data.sets);
        expect(newWorkout.reps).toBe(data.reps);
        expect(newWorkout.weight).toBe(data.weight);
        expect(newWorkout.distance).toBe(data.distance);
      });
  });

  // test for delete /workouts/:id
  test("DELETE /workouts/:id", async () => {
    const workout = await Workout.create({
      exercises: [
        {
          exercise_id: "6188d363ee05ab76027e33cf",
          sets: 4,
          reps: 12,
          weight: 100,
          distance: null,
        },
      ],
    });

    id = workout._id;

    await request(app)
      .delete("/workouts/" + workout.id)
      .expect(200)
      .then(async () => {
        expect(await Workout.findOne({ _id: workout.id })).toBeFalsy();
      });
  });
});
