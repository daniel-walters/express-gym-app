//import and configure dotenv
import dotenv from 'dotenv';
dotenv.config();

//import express and create app
import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

//import initializeApp and initialize with admin credentials
import firebaseAdmin from 'firebase-admin';
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS))
});

//set server to receieve json and form-data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//default route setup
app.get('/', (request, response) => {
    response.json({placeholder: "Express Gym App"});
});

//import and use user routes
import userRoutes from './Users/userRoutes.js';
app.use('/users', userRoutes);

//start server
app.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`);
});