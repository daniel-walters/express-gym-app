import checkin from "../db/models/checkin.js";

export async function checkIn() {
    const checkIn = await checkin.find({});
    const doc = checkIn[0];
    doc.numCheckedIn = doc.numCheckedIn + 1;
    await doc.save();
    return doc.numCheckedIn;
}

export async function checkOut() {
    const checkIn = await checkin.find({});
    const doc = checkIn[0];
    doc.numCheckedIn = doc.numCheckedIn === 0 ? 0 : doc.numCheckedIn - 1;
    await doc.save();
    return doc.numCheckedIn;
}