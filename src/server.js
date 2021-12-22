import { app } from "./app.js";
import { openDBConnection } from "./db/index.js";
import checkin from "./db/models/checkin.js";

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

//open db connection
await openDBConnection();
//create checkIn document if one doesnt exist
const checkInDoc = await checkin.find({});
console.log("checkindoc:", checkInDoc);
if (checkInDoc.length === 0) {
    await checkin.create({numCheckedIn: 0});
    console.log("creating checkin doc");
}

//start server
app.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`);
});