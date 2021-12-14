import mongoosePkg from "mongoose";

const { Mongoose } = mongoosePkg;
const mongoose = new Mongoose();

export async function openDBConnection() {
    await mongoose.connect(process.env.DATABASE_URI);
    // console.log("Database Connected");
}

export default mongoose;