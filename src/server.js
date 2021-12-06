import { app } from "./app.js";
import { openDBConnection } from "./db/index.js";

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

//open db connection
await openDBConnection();

//start server
app.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`);
});