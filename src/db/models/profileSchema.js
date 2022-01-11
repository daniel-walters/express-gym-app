import mongoose from "../index.js";

// userId will use firebase's user uid. this can be used to access user email etc.
// workout/events = array of object ids that we can populate from Workout and Event collections
const ProfileSchema = new mongoose.Schema({
    userId: String,
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    isStaff: {type: Boolean, required: true, default: false},
    description: String,
    weight: {type: Number, min: 0, default: null},
    prevWeights: [Number],
    checkedIn: {type: Boolean, required: true, default: false},
    workouts: {type: [{
        name: {type: String, required: true},
        exercises: [{
            exerciseId: {type: mongoose.Schema.Types.ObjectId, ref: "Exercise"},
            customisedName: String,
            sets: Number,
            reps: Number,
            weight: Number,
            prevWeight: [Number],
            distance: Number,
            prevDistance: [Number]
          },
        ],
      },
    ],
    default: [],
  },
});

export default mongoose.model("Profile", ProfileSchema);
