import mongoose from "../index.js";

const exerciseSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    defaultSets: Number,
    defaultReps: Number,
    defaultWeight: Number,
    defaultDistance: Number
});

export default mongoose.model("Exercise", exerciseSchema);