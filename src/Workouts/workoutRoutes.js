import express from 'express';
import Workout from '../db/models/workout.js'
// import { getWorkout } from './workoutFunctions.js';  AHHHHH WHY THE MODULE CAN'T BE FOUND ????


const routes = express.Router();

routes.get('/',  async (req, res) => {
    try{
        const workouts = await Workout.find({});
        res.status(200).json(workouts)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

routes.get('/:id',  async (req, res) => {
    try {
        const workout = await Workout.findById({ _id: req.params.id });
        res.status(201).json(workout);
      } catch (err) {
        res.status(422).json({message: err.message});
      }
})

routes.post('/', async(req, res) => {
    try {
        const workout = await Workout.create(req.body)
        // console.log(req.body)
        res.status(201).json(workout)
    }catch(err){
        res.status(422).json({message: err.message});
    }
})

routes.patch('/:id', async (req, res) => {
    try {
      const workout = await Workout.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json(workout);
    } catch (err) {
      res.status(422).json({message: err.message});
    }
  });

routes.delete('/:id', getWorkout, async(req, res) => {
    try{
        await res.workout.remove();
        res.status(200).json({message: "Deleted Workout"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getWorkout(req, res, next){
    let workout
    try{
        workout = await Workout.findById({ _id: req.params.id });
        // console.log(req.params.id)
        if (workout == null) return res.status(404).json({ message: "Cannot find workout" })
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.workout = workout;
    next();
}


export default routes;