import mongoose from "../index.js";

const checkInSchema = new mongoose.Schema({
    numCheckedIn: Number,
    dailyStats: {
        Sunday: Number,
        Monday: Number,
        Tuesday: Number,
        Wednesday: Number,
        Thursday: Number,
        Friday: Number,
        Saturday: Number
    }
}, {
    timestamps: true
});

export default mongoose.model("CheckIn", checkInSchema);