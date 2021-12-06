import Exercise from '../db/models/exercise.js';

export async function deleteExercise(id) {
    let exercise = await Exercise.deleteOne({ _id: id });
    return exercise
};

//get all exercises
export async function getAllExercises() {
    let exercises = await Exercise.find();
    return exercises;
}

//get exercise by id
export async function getExerciseById(id){
    let exercise = await Exercise.findById({_id: id})
    return exercise;
}

//create an exercise
export async function createExercise(details){
    let newExercise = new Exercise({
        name: details.name,
        description: details.description,
        defaultSets: details.defaultSets,
        defaultReps: details.defaultReps,
        defaultWeight: details.defaultWeight,
        defaultDistance: details.defaultDistance
    });

    let result = await newExercise.save();
    return result;
}

export async function updateExerciseById(id, details){
    const updateExerciseDetails = {
        name: details.name,
        description: details.description,
        defaultSets: details.defaultSets,
        defaultReps: details.defaultReps,
        defaultWeight: details.defaultWeight,
        defaultDistance: details.defaultDistance
    }
     // By default, findOneAndUpdate() returns the document as it was before update was applied.
    // Set the new option to true to return the document after update was applied.
    let exercise = await Exercise.findByIdAndUpdate(id, updateExerciseDetails, { new: true });
    
    return exercise
}

