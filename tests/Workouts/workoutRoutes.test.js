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
    let workout = await Workout.create({
      name: "Monday workout",
      exercises: [
        {
          exercise_id: "6188d363ee05ab76027e33cf",
          sets: null,
          reps: null,
          weight: null,
          distance: 10,
        },
        {
          exercise_id: "6188d363ee05ab76027e44ef",
          sets: 5,
          reps: 20,
          weight: 80,
          distance: null,
        },
        {
          exercise_id: "6188d363ee05ab76027e22ef",
          sets: 4,
          reps: 15,
          weight: 100,
          distance: null,
        }
      ],
    });
    id = workout._id;
    workout = JSON.parse(JSON.stringify(workout));
    const workouts = await Workout.find({});
    
    await request(app)
      .get("/workouts")
      .expect(200)
      .then((response) => {
        // Check the response type and length
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(workouts.length);

        // Check the response data
        expect(response.body[0].name).toBe(workout.name);
        expect(response.body[0]._id).toBeTruthy();

        const exerciseLength = workout.exercises.length
        for(let i = 0; i < exerciseLength - 1; i++) {
          expect(response.body[0].exercises[i]._id).toBe(workout.exercises[i]._id);
          expect(response.body[0].exercises[i].sets).toBe(workout.exercises[i].sets);
          expect(response.body[0].exercises[i].weight).toBe(workout.exercises[i].weight);
          expect(response.body[0].exercises[i].distance).toBe(workout.exercises[i].distance);
        }
        
      });
  });

  // test for get /workouts/:id
  test(" GET /workouts/:id -> should respond with statusCode 201 and get an correct id, sets, reps and weight", async () => {
    const workout = await Workout.create({
      name: "Tuesday workout",
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
        expect(response.body.name).toBe(workout.name);
        expect(response.body._id).toBe(workout.id);
        expect(response.body.exercises.exercise_id).toBe(workout.exercises.exercise_id);
        expect(response.body.exercises.sets).toBe(workout.exercises.sets);
        expect(response.body.exercises.reps).toBe(workout.exercises.reps);
        expect(response.body.exercises.weight).toBe(workout.exercises.weight);
        expect(response.body.exercises.distance).toBe(workout.exercises.distance);
      });
  });

  // test for post /workouts
  test("POST/workouts -> should respond with statusCode 201 and add new workout with correct sets, reps and weight value", async () => {
    const newWorkout = {
      name: "Wednesday workout",
      exercises: [
        {
          exercise_id: "6188d363ee05ab76027e44cf",
          sets: 5,
          reps: 25,
          weight: 70,
          distance: null,
        }
      ],
    };

    await request(app)
      .post("/workouts")
      .send(newWorkout)
      .expect(201)
      .then(async (response) => {
        // Check the response
        expect(response.body._id).toBeTruthy();
        expect(response.body.exercises.exercise_id).toBe(newWorkout.exercises.exercise_id);
        expect(response.body.exercises.sets).toBe(newWorkout.exercises.sets);
        expect(response.body.exercises.reps).toBe(newWorkout.exercises.reps);
        expect(response.body.exercises.weight).toBe(newWorkout.exercises.weight);
        expect(response.body.exercises.distance).toBe(newWorkout.exercises.distance);
        id = response.body._id;

        // Check the data in the database
        const workout = await Workout.findOne({ _id: response.body._id });
        expect(workout).toBeTruthy();
        expect(workout.exercises.exercise_id).toBe(newWorkout.exercises.exercise_id);
        expect(workout.exercises.sets).toBe(newWorkout.exercises.sets);
        expect(workout.exercises.reps).toBe(newWorkout.exercises.reps);
        expect(workout.exercises.weight).toBe(newWorkout.exercises.weight);
        expect(workout.exercises.distance).toBe(newWorkout.exercises.distance);
      });
  });

  // test for put /workouts:id
  test("PUT /workouts/:id -> should respond with statusCode 200 and update workout with correct sets, reps and weight value", async () => {
    const workout = await Workout.create({
      name: "Thursday workout",
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
      name: "Updated thursday workout",
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
        expect(response.body.exercises.exercise_id).toBe(workout.exercises.exercise_id);
        expect(response.body.exercises.sets).toBe(data.exercises.sets);
        expect(response.body.exercises.reps).toBe(data.exercises.reps);
        expect(response.body.exercises.weight).toBe(data.exercises.weight);
        expect(response.body.exercises.distance).toBe(data.exercises.distance);

        // Check the data in the database
        const newWorkout = await Workout.findOne({ _id: response.body._id });
        expect(newWorkout).toBeTruthy();
        expect(newWorkout.name).toBe(data.name);
        expect(newWorkout.exercises.sets).toBe(data.exercises.sets);
        expect(newWorkout.exercises.reps).toBe(data.exercises.reps);
        expect(newWorkout.exercises.weight).toBe(data.exercises.weight);
        expect(newWorkout.exercises.distance).toBe(data.exercises.distance);
      });
  });

  // test for delete /workouts/:id
  test("DELETE /workouts/:id", async () => {
    const workout = await Workout.create({
      name: "Friday workout",
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
