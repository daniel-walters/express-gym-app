import express from 'express';
import { signUpUser, signInUser } from './userFunctions.js';
import { checkIfUserIsAMember, validatePasswordSecurity, checkPasswordConfirmation } from './userMiddleware.js';

const routes = express.Router();
const signUpValidations = [checkIfUserIsAMember, validatePasswordSecurity, checkPasswordConfirmation];

routes.post('/sign-up', signUpValidations, async (request, response) => {
    const {email, password, passwordConfirm, membershipNumber} = request.body;

    const newUserDetails = {
        email,
        password,
        passwordConfirm,
        membershipNumber
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

    response.status(201).json(signInResult);
});

routes.post('/sign-in', async (request, response) => {
    const {email, password} = request.body;

    const existingUserDetails = {
        email: email,
        password: password
    };

    const signInResult = await signInUser(existingUserDetails);

    if (signInResult.error) {
        console.log("Sign in failed, returning error to requester");
        response.status(401).json(signInResult);
        return;
    }

    response.status(200).json(signInResult);
});

export default routes;