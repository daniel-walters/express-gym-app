import express from 'express';
import Exercise from '../db/models/exercise.js';

const routes = express.Router();

routes.get('/',  async (req, res) => {
    try{
        const exercises = await Exercise.find({});
        res.status(200).json(exercises)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

routes.get('/:id',  async (req, res) => {
    try {
        const exercise = await Exercise.findById({ _id: req.params.id });
        res.status(201).json(exercise);
      } catch (err) {
        res.status(422).json({message: err.message});
      }
})

routes.post('/', async(req, res) => {
    try {
        const exercise = await Exercise.create(req.body)
        res.status(201).json(exercise)
    }catch(err){
        res.status(422).json({message: err.message});
    }
})

routes.put('/:id', async (req, res) => {
    try {
        // By default, findOneAndUpdate() returns the document as it was before update was applied.
        // Set the new option to true to return the document after update was applied.
      const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(exercise);
    } catch (err) {
      res.status(422).json({message: err.message});
    }
  });

routes.delete('/:id', getExercise, async(req, res) => {
    try{
        await res.exercise.remove();
        res.status(200).json({message: "Deleted Exercise"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

export async function getExercise(req, res, next){
    let exercise;
    try{
        exercise = await Exercise.findById(req.params.id);
        if (exercise == null) return res.status(404).json({ message: "Cannot find exercise" })
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.exercise = exercise;
    next();
}

export default routes;