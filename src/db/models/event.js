import mongoose from "../index.js";

const eventSchema = mongoose.Schema({
    name: String,
    description: String,
    startTime: Date,
    endTime: Date,
    registeredUsers: [mongoose.SchemaTypes.ObjectId],
    spotsAvailable: Number,
    category: {
        type: String,
        enum: [
            'Personal Training',
            'Competition',
            'Class'
        ]
    }
});

export default mongoose.model("Event", eventSchema);