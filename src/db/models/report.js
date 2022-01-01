import mongoose from "../index.js";

const reportSchema = mongoose.Schema({
    type: {
        type: String, 
        enum: ['Faulty Equipment','Unsocial Behaviour'],
        required: true
    },
    userId: {type: String, ref: "Profile"},
    description: {type: String, required: true},
    resolved: {type: Boolean, default: false},
    resolvedBy:{type: String, default: null},
    reportDate: {type: Date, default: Date.now },
    reportImage: String  
});

export default mongoose.model("Report", reportSchema);