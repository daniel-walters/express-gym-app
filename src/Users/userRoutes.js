import express from 'express';
import { signUpUser, signInUser, resetPassword, forgotPassword, deleteUser } from './userFunctions.js';
import { checkIfUserIsAMember, validatePasswordSecurity, checkPasswordConfirmation } from './userMiddleware.js';
import Profile from '../db/models/profileSchema.js';
import { checkIfUserIsAStaff } from '../Profiles/profileFunctions.js';
import { getAuth, signOut } from 'firebase/auth';

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
        response.json({error: signUpResult.error.message});
        return;
    }

    const signInResult = await signInUser(newUserDetails);

    if (signInResult.error) {
        console.log("Sign in failed, returning error to requester");
        response.json({error: signUpResult.error.message});
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
    response.status(201).json(profile);
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
        response.status(401).json({error: signUpResult.error.message});
        return;
    }

    const profile = await Profile.findOne({userId: signInResult.uid});

    response.status(200).json(profile);
});

routes.post('/sign-out', async (request, response) => {
    const auth = getAuth();
    signOut(auth).then(() => {
        response.json({status: "success"});
    }).catch((error) => {
        console.log(error);
        response.json({status: "failed"});
    });
});

routes.post('/reset-password', async (request, response) => {
    resetPassword().then(() => {
        response.json({status: "success"});
    }).catch((e) => {
        console.log(e);
        response.json({status: "failed"});
    })
});

routes.post('/forgot-password', async (request, response) => {
    forgotPassword(request.body.email).then(() => {
        response.json({status: "success"});
    }).catch((e) => {
        console.log(e);
        response.json({status: "failed"});
    });
})

routes.delete('/delete', async (request, response) => {
    const {uid} = request.body;
    deleteUser(uid).then(() => {
        response.json({status: "deleted"});
    }).catch((e) => {
        console.log(e);
        response.json({status: "failed"});
    })
})

export default routes;