import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

import firebaseAdmin from 'firebase-admin';
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS))
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (request, response) => {
    response.json({placeholder: "Express Gym App"});
});

app.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`);
});