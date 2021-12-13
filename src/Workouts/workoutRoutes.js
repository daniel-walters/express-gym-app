import express from 'express';
import Workout from '../db/models/workout.js'
import { getAllWorkouts, getWorkoutById, createWorkout, updateWorkout } from './workoutFunctions.js';  
import { getWorkoutToDelete } from './workoutMiddleware.js'

const routes = express.Router();

routes.get('/',  async (req, res) => {
    try{
        const workouts = await getAllWorkouts();
        res.status(200).json(workouts)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

routes.get('/:id',  async (req, res) => {
    try {
        const workout = await getWorkoutById(req.params.id);
        res.status(201).json(workout);
      } catch (err) {
        res.status(422).json({message: err.message});
      }
})

routes.post('/', async(req, res) => {
    try {
        const workout = await createWorkout(req.body)
        res.status(201).json(workout)
    }catch(err){
        res.status(422).json({message: err.message});
    }
})

routes.put('/:id', async (req, res) => {
    try {
      const workout = await updateWorkout(req.params.id, req.body);
      res.status(200).json(workout);
    } catch (err) {
      res.status(422).json({message: err.message});
    }
  });

routes.delete('/:id', getWorkoutToDelete, async(req, res) => {
    try{
        await res.workout.remove();
        res.status(200).json({message: "Deleted Workout"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})



export default routes;