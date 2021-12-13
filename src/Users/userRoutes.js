import express from 'express';
import { signUpUser, signInUser } from './userFunctions.js';
import { checkIfUserIsAMember, validatePasswordSecurity, checkPasswordConfirmation } from './userMiddleware.js';
import Profile from '../db/models/profileSchema.js';
import { checkIfUserIsAStaff } from './profileFunctions.js';

const routes = express.Router();
const signUpValidations = [checkIfUserIsAMember, validatePasswordSecurity, checkPasswordConfirmation];

routes.post('/sign-up', signUpValidations, async (request, response) => {
    const {email, password, passwordConfirm, membershipNumber, firstName, lastName} = request.body;

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

    // after firebase registration is complete, create a profile using user uid: CLARE
    const isStaff = checkIfUserIsAStaff(parseInt(membershipNumber));
    const userId = signInResult.uid;
    const profileDetails = {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        isStaff: isStaff
    }
    const profile = await Profile.create(profileDetails);

    // response includes firebase return info. no profile.
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