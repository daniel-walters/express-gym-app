import Workout from '../db/models/workout';


export async function deleteWorkout(id) {
    let workout = await Workout.deleteOne({ _id: id });
    return workout
};


export async function getWorkout(req, res, next){
    let workout;
    try{
        workout = await Workout.findById(req.params.id);
        if (workout == null) return res.status(404).json({ message: "Cannot find workout" })
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.workout = workout;
    next();
}

