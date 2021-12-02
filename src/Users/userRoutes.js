import express from 'express';
import { signUpUser, signInUser } from './userFunctions.js';

const routes = express.Router();

routes.post('/sign-up', async (request, response) => {
    const {email, password} = request.body;

    const newUserDetails = {
        email: email,
        password: password
    };

    const signUpResult = await signUpUser(newUserDetails);

    if (signUpResult.error) {
        console.log("Sign up failed, returning error to requester");
        response.json(signUpResult);
        return;
    }

    const signInResult = await signInUser(newUserDetails);

    if (signInResult.error) {
        console.log("Sign in failed, returning error to requester");
        response.json(signInResult);
        return;
    }

    response.json(signInResult);
});

routes.post('/sign-in', async (request, response) => {
    const {email, password} = request.body;

    const existingUserDetails = {
        email: email,
        password: password
    };

    const signInResult = await signInUser(existingUserDetails);

    if (signInResult.error) {
        console.log("Sign up failed, returning error to requester");
        response.json(signInResult);
        return;
    }

    response.json(signInResult);
});

export default routes;