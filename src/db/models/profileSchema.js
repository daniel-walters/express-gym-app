import mongoose from "../index.js"

// userId will use firebase's user uid. this can be used to access user email etc.
// workout/events = array of object ids that we can populate from Workout and Event collections
const ProfileSchema = new mongoose.Schema({
    userId: String,
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    isStaff: {type: Boolean, require: true, default: false},
    weight: {type: Number, min: 0, default: null},
    workouts: {type: [{type: mongoose.Schema.Types.ObjectId, ref: "Workout"}], default: []},
    events: {type: [{type: mongoose.Schema.Types.ObjectId, ref: "Event"}], defaut: []}
});

export default mongoose.model("Profile", ProfileSchema)