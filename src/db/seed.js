import checkin from "./models/checkin.js";
import exercise from "./models/exercise.js";
import exercisesList from "../../external_db/exercises.js";

export async function seedCheckIn() {
    const checkInDoc = await checkin.find({});
    if (checkInDoc.length === 0) {
        console.log("seeding checkin")
        await checkin.create({numCheckedIn: 0});
    }
}

export async function seedExercises() {
    const exerciseDoc = await exercise.find({});
    if (exerciseDoc.length === 0) {
        console.log("seeding exercsies")
        await exercise.create(exercisesList);
    }
}