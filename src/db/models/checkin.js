import mongoose from "../index.js";

const checkInSchema = new mongoose.Schema({
    numCheckedIn: Number,
    dailyStats: {
        Sunday: {type: Number, default: 0},
        Monday: {type: Number, default: 0},
        Tuesday: {type: Number, default: 0},
        Wednesday: {type: Number, default: 0},
        Thursday: {type: Number, default: 0},
        Friday: {type: Number, default: 0},
        Saturday: {type: Number, default: 0},
    },
    weeksActive: {type: Number, default: 1}
}, {
    timestamps: true
});

export default mongoose.model("CheckIn", checkInSchema);