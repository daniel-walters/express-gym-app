import express from "express";
import uploadProfileImage from "./profileImageUpload.js";
import { deleteFileFromLocal, uploadFile } from "../storage.js";
const routes = express.Router();

import {
    getProfileByUid, 
    updateProfileByUid,
    getStaffProfiles
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
            workouts: req.body.workouts,
            email: req.body.email,
            photo: req.body.photo,
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

routes.put('/:uid/photo', uploadProfileImage.single("photo"), async (req, res) => {
    console.log("request", req)
    let profilePrev = await getProfileByUid(req.params.uid);
    console.log("profilePrev: ", profilePrev)
    let prevImg = profilePrev.photo;
    let url = "";

    if (req.file) {
        console.log("there a file")
        url = await uploadFile(req.file.path, req.file.originalname).catch((error) => console.log(error));
        deleteFileFromLocal(req.file.path);
    }

    try{
        profilePrev.photo = url ? url : prevImg
        await profilePrev.save({validateBeforeSave: false});
        res.json(profilePrev)
    } catch (err) {
        res.json({
            error: err.message
        });
    }

})

routes.get('/staff/all', async(req, res) => {
    try {
        let staffProfiles = await getStaffProfiles();
        res.status(201).json(staffProfiles);
    } catch (err) {
        res.json({
            error: err.message
        });
    }
})

export default routes;