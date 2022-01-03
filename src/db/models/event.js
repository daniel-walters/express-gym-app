import mongoose from "../index.js";

const eventSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    startTime: {
        type: Date, 
        required: true,
        validate: [startTimeValidator, "Start date cannot be set earlier than current time"]
    },
    endTime: {
        type: Date,
        validate: [dateValidator, "End date cannot be set earlier then start date"],
        required: true
    },
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
    },
    createdBy: {type: mongoose.SchemaTypes.ObjectId, ref: "Profile", required: true}
});

function dateValidator(value) {
    return this.startTime <= value;
}

function startTimeValidator(value) {
    return this.startTime >= Date.now();
}

export default mongoose.model("Event", eventSchema);