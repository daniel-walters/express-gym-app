import mongoose from "../index.js";

const eventSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true},
    registeredUsers: [mongoose.SchemaTypes.ObjectId],
    spotsAvailable: Number,
    eventImage: String,
    category: {
        type: String,
        enum: [
            'Personal Training',
            'Competition',
            'Class'
        ],
        required: true
    }
});

export default mongoose.model("Event", eventSchema);