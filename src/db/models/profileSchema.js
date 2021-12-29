import mongoose from "../index.js"

// userId will use firebase's user uid. this can be used to access user email etc.
// workout/events = array of object ids that we can populate from Workout and Event collections
const ProfileSchema = new mongoose.Schema({
    userId: String,
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    isStaff: {type: Boolean, required: true, default: false},
    description: String,
    weight: {type: Number, min: 0, default: null},
    workouts: {type: [{
        name: {type: String, required: true},
        exercises: [{
            exerciseId: {type: mongoose.Schema.Types.ObjectId, ref: "Exercise"},
            sets: Number,
            reps: Number,
            weight: Number,
            distance: Number
        }]
    }], default: [] } 
});

export default mongoose.model("Profile", ProfileSchema)