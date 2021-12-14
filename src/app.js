//import and configure dotenv
import dotenv from 'dotenv';
dotenv.config();

//import express and create app
import express from 'express';

export const app = express();

//import cors
import cors from 'cors';
app.use(cors({
    origin: ['https://gymappdevelopment.netlify.app/', 'http://localhost:3000/', 'http://localhost:3001/']
}));

//import initializeApp and initialize with admin credentials
import firebaseAdmin from 'firebase-admin';
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)),
    storageBucket: "gs://gym-app-t3a2.appspot.com"
});

//import initializeAppClient and run function
import { initializeAppClient } from './Users/userFunctions.js';
initializeAppClient();

//export storage bucket
export const storage = firebaseAdmin.storage().bucket();

//set server to receieve json and form-data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//default route setup
app.get('/', (request, response) => {
    response.status(200).json({placeholder: "Express Gym App"});
});

//import and use user routes
import userRoutes from './Users/userRoutes.js';
app.use('/users', userRoutes);

//import and use workout routes
import workoutRoutes from './Workouts/workoutRoutes.js';
app.use('/workouts', workoutRoutes);

//import and use exercise routes
import exerciseRoutes from './Exercises/exerciseRoutes.js';
app.use('/exercises', exerciseRoutes);


//import and use report routes
import reportRoutes from './Reports/reportRoutes.js';
app.use('/reports', reportRoutes);

//import and use event routes
import eventRoutes from './Events/eventRoutes.js';
app.use('/events', eventRoutes);

//import and use profile routes
import profileRoutes from './Profiles/profileRoutes.js';
app.use('/profiles', profileRoutes);