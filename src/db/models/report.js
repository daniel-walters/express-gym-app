import mongoose from "../index.js";

const reportSchema = mongoose.Schema({
    type: {type: String, required: true},
    description: {type: String, required: true},
    resolved: {type: Boolean, required: true},
    reportDate: {type: Date, default: Date.now },
    reportImg: String
});

export default mongoose.model("Report", reportSchema);