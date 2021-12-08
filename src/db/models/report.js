import mongoose from "../index.js";

const reportSchema = mongoose.Schema({
    type: {type: String, required: true},
    description: {type: String, required: true},
    resolved: {type: Boolean, required: true},
    reportDate: {type: Date, default: Date.now },
    reportImage: String
});

export default mongoose.model("Report", reportSchema);