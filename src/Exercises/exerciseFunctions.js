import Exercise from '../db/models/exercise';

export async function deleteExercise(id) {
    let exercise = await Exercise.deleteOne({ _id: id });
    return exercise
};


