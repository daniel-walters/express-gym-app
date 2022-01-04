import express from "express";
const routes = express.Router();

import {
    getProfileByUid, 
    updateProfileByUid
} from './profileFunctions.js'

routes.get("/:uid", async (req, res) => {
    try {
        let profile = await getProfileByUid(req.params.uid);
        res.status(201).json(profile);
    } catch (err) {
        res.json({
            error: err.message
        });
    }
})

routes.put("/:uid", async (req, res) => {
    try {
        let updatedProfileDetails = {
            userId: req.body.userId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            description: req.body.description,
            isStaff: req.body.isStaff,
            weight: req.body.weight,
            checkedIn: req.body.checkedIn,
            workouts: req.body.workouts
        };

        let profilePrev = await getProfileByUid(req.params.uid);

        //user wouldn't be allowed to change their userid and staff status in profile
        if (profilePrev.userId !== updatedProfileDetails.userId || profilePrev.isStaff !== updatedProfileDetails.isStaff){
            throw new Error("You are not autorised to edit user id or staff status") 
        }

        let profile = await updateProfileByUid(
            req.params.uid,
            updatedProfileDetails
        );

        res.status(200).json(profile);
    } catch (err) {
        res.json({
            error: err.message
        });
    }
})

export default routes;