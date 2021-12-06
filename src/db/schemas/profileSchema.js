const mongoose = require('mongoose');

const ProfileSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    firstName: {type: String, require: true},
    lastName: String,
    isStaff: {type: Boolean, require: true},
    weight: {type: Number, min: 0},
    myWorkouts: [Schema.Types.ObjectId],
    myEvents: [Schema.Types.ObjectId]
});

export default mongoose.model("Profile", ProfileSchema)