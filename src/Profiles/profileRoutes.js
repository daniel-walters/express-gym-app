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
        res.status(422).json({
            message: err.message
        });
    }
})

routes.put("/:uid", async (req, res) => {
    try {
        let updatedProfileDetails = {
            userId: req.body.userId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            isStaff: req.body.isStaff,
            weight: req.body.weight,
            workouts: req.body.workouts,
            events: req.body.events,
        };

        let profilePrev = await getProfileByUid(req.params.uid);
        if (profilePrev.userId !== updatedProfileDetails.userId || profilePrev.isStaff !== updatedProfileDetails.isStaff){
            throw new Error("You are not autorised to edit user id or staff status") 
        }

        let profile = await updateProfileByUid(
            req.params.uid,
            updatedProfileDetails
        );

        res.status(200).json(profile);
    } catch (err) {
        res.status(422).json({
            message: err.message
        });
    }
})

export default routes;