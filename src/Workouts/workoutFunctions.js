import Workout from '../db/models/workout.js';

export async function deleteWorkout(id) {
    let workout = await Workout.deleteOne({ _id: id });
    return workout
};

//get all workouts
export async function getAllWorkouts() {
    let workouts = await Workout.find();
    return workouts;
}

//get workout by id
export async function getWorkoutById(id){
    let workout = await Workout.findById({_id: id})
    return workout;
}

//create workout
export async function createWorkout(details){
    let workout = await Workout.create(details)
    return workout
}

//update workout
export async function updateWorkout(id, details){
    let updatedWorkout = await Workout.findByIdAndUpdate(id, details, { new: true });
    return updatedWorkout
}