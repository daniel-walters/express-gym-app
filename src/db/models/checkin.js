import mongoose from "../index.js";

const checkInSchema = new mongoose.Schema({
    numCheckedIn: Number,
});

export default mongoose.model("CheckIn", checkInSchema);