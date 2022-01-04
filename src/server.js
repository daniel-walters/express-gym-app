import { app } from "./app.js";
import { openDBConnection } from "./db/index.js";
import { seedCheckIn, seedExercises } from "./db/seed.js";

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

//open db connection and seed db
openDBConnection();
seedCheckIn();
seedExercises();

//start server
app.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`);
});
