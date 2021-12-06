import mongoosePkg from "mongoose";

const { Mongoose } = mongoosePkg;
const mongoose = new Mongoose();

export async function openDBConnection() {
    await mongoose.connect('mongodb://localhost/gym-db');
    console.log("Database Connected");
}

export default mongoose;