import mongoose from "../index.js";

const reportSchema = mongoose.Schema({
    type: {
        type: String, 
        enum: ['Faulty Equipment','Unsocial Behaviour'],
        required: true
    },
    description: {type: String, required: true},
    resolved: {type: Boolean, default: false},
    reportDate: {type: Date, default: Date.now },
    reportImage: String
});

export default mongoose.model("Report", reportSchema);