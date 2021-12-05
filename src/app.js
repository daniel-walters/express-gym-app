//import and configure dotenv
import dotenv from 'dotenv';
dotenv.config();

//import express and create app
import express from 'express';

export const app = express();

//import initializeApp and initialize with admin credentials
import firebaseAdmin from 'firebase-admin';
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS))
});

//import initializeAppClient and run function
import { initializeAppClient } from './Users/userFunctions.js';
initializeAppClient();

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
import exerciseRoutes from './Exercise/exerciseRoutes.js';
app.use('/exercises', exerciseRoutes);