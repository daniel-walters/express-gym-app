import mongoose from "../index.js";

const eventSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    startTime: {type: Date, min: Date.now(), required: true, message: "Starting time cannot be set earlier than current time"},
    endTime: {type: Date, min: this.startTime, required: true, message: "End time cannot be set earlier than the start time"},
    registeredUsers: [{type: mongoose.SchemaTypes.ObjectId, ref: "Profile"}],
    spotsAvailable: {type: Number, min: 1},
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