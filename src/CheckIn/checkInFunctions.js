import checkin from "../db/models/checkin.js";
import profile from "../db/models/profileSchema.js";
import moment from "moment";

export async function getCheckedIn() {
    const checkIn = await checkin.find({});
    const doc = checkIn[0];
    return doc.numCheckedIn;
}

export async function checkIn(userId) {
    //update check in doc to +1
    const checkIn = await checkin.find({});
    const doc = checkIn[0];
    doc.numCheckedIn = doc.numCheckedIn + 1;

    //add counter to day in stats
    const currentDate = moment();
    const currentDay = currentDate.format('dddd');
    console.log(`Current day is: ${currentDay}`);
    doc.dailyStats[currentDay] = doc.dailyStats[currentDay] + 1;

    //check if to increment weeks running
    const dateCreated = moment(doc.createdAt);
    const weeksSinceCreated = currentDate.diff(dateCreated, 'weeks') + 1;
    console.log(`weeksSinceCreated: ${weeksSinceCreated}`);
    if (weeksSinceCreated > doc.weeksActive) doc.weeksActive = weeksSinceCreated;

    //update doc
    await doc.save();

    //update profile doc to checked in
    const profiles = await profile.find({userId: userId});
    const targetProfile = profiles[0]
    targetProfile.checkedIn = true;
    await targetProfile.save({validateBeforeSave: false});

    return doc.numCheckedIn;
}

export async function checkOut(userId) {
    //update check in doc to - 1
    const checkIn = await checkin.find({});
    const doc = checkIn[0];
    doc.numCheckedIn = doc.numCheckedIn === 0 ? 0 : doc.numCheckedIn - 1;
    await doc.save();

    //update profile doc to check out
    const profiles = await profile.find({userId: userId});
    const targetProfile = profiles[0];
    targetProfile.checkedIn = false;
    await targetProfile.save({validateBeforeSave: false});
    
    return doc.numCheckedIn;
}