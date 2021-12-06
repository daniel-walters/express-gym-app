import express from "express";
import {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExerciseById,
} from "./exerciseFunctions.js";
import { getExerciseforDelete } from "./exerciseMiddleware.js";
const routes = express.Router();

routes.get("/", async (req, res) => {
  try {
    let exercises = await getAllExercises();
    res.status(200).json(exercises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

routes.get("/:id", async (req, res) => {
  try {
    let exercise = await getExerciseById(req.params.id);
    res.status(201).json(exercise);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
});

routes.post("/", async (req, res) => {
  try {
    let exercise = await createExercise({
      name: req.body.name,
      description: req.body.description,
      defaultSets: req.body.defaultSets,
      defaultReps: req.body.defaultReps,
      defaultWeight: req.body.defaultWeight,
      defaultDistance: req.body.defaultDistance,
    });
    res.status(201).json(exercise);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
});

routes.put("/:id", async (req, res) => {
  try {
    let updateExerciseDetails = {
      name: req.body.name,
      description: req.body.description,
      defaultSets: req.body.defaultSets,
      defaultReps: req.body.defaultReps,
      defaultWeight: req.body.defaultWeight,
      defaultDistance: req.body.defaultDistance,
    };
    let exercise = await updateExerciseById(
      req.params.id,
      updateExerciseDetails
    );
    res.status(200).json(exercise);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
});

routes.delete("/:id", getExerciseforDelete, async (req, res) => {
  try {
    await res.exercise.remove();
    res.status(200).json({ message: "Deleted Exercise" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default routes;
