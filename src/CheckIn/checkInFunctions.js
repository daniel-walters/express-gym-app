import checkin from "../db/models/checkin.js";
import profile from "../db/models/profileSchema.js";

export async function checkIn(userId) {
    const checkIn = await checkin.find({});
    const doc = checkIn[0];
    doc.numCheckedIn = doc.numCheckedIn + 1;
    await doc.save();

    const profiles = await profile.find({userId: userId});
    const targetProfile = profiles[0]
    targetProfile.checkedIn = true;
    await targetProfile.save({validateBeforeSave: false});

    return doc.numCheckedIn;
}

export async function checkOut(userId) {
    const checkIn = await checkin.find({});
    const doc = checkIn[0];
    doc.numCheckedIn = doc.numCheckedIn === 0 ? 0 : doc.numCheckedIn - 1;
    await doc.save();
    
    const profiles = await profile.find({userId: userId});
    const targetProfile = profiles[0];
    targetProfile.checkedIn = false;
    await targetProfile.save({validateBeforeSave: false});
    console.log("ERROR", e);
    
    return doc.numCheckedIn;
}