import mongoosePkg from "mongoose";

const { Mongoose } = mongoosePkg;
const mongoose = new Mongoose();

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost/gym-db');
    console.log("Database Connected");
}

export default mongoose;