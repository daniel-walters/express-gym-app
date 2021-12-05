import mongoose from "../index.js";

const workoutSchema = new mongoose.Schema({
    exercises: [
        {
            exercise_id: mongoose.SchemaTypes.ObjectId,
            sets: Number,
            reps: Number,
            weight: Number,
            distance: Number
        }
    ]
})

export default mongoose.model("Workout", workoutSchema)

