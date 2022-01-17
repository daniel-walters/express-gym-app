import mongoose from "../index.js";

const workoutSchema = new mongoose.Schema({

    name: {type: String, required: true },
    exercises: [
        {
            exerciseId: mongoose.SchemaTypes.ObjectId,
            sets: Number,
            reps: Number,
            weight: Number,
            distance: Number
        }
    ]
})

export default mongoose.model("Workout", workoutSchema)

