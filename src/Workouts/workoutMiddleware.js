import { getWorkoutById } from "./workoutFunctions.js";


export async function getWorkoutToDelete(req, res, next){
    let workout;
    try{
        workout = await getWorkoutById(req.params.id);
        if (workout == null) return res.status(404).json({ message: "Cannot find workout" })
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.workout = workout;
    next();
}