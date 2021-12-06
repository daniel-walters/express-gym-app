const mongoose = require('mongoose');

// userId will use firebase's user uid. this can be used to access user email etc.
// workout/events = array of object ids that we can populate from Workout and Event collections
const ProfileSchema = new Schema({
    userId: String,
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    isStaff: {type: Boolean, require: true, default: false},
    weight: {type: Number, min: 0},
    workouts: {type: [{type: Schema.Types.ObjectId, ref: "Workout"}], default: []},
    events: {type: [{type: Schema.Types.ObjectId, ref: "Event"}], defaut: []}
});

export default mongoose.model("Profile", ProfileSchema)