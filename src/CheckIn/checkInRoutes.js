import express from "express";
import { checkIn, checkOut, getCheckedIn, getStats } from "./checkInFunctions.js";

const routes = express.Router();

routes.get("/", async (request, response) => {
    try {
        const num = await getCheckedIn();
        response.status(200).json({num: num});
    } catch (e) {
        response.status(422).json({status: "failure"});
    }
});

routes.post("/check-in", async (request, response) => {
    try {
        const {userId} = request.body;
        const num = await checkIn(userId);
        response.status(200).json({status: "success", num: num});
    } catch (e) {
        response.status(422).json({status: "failure"});
    }
});

routes.post("/check-out", async (request, response) => {
    try {
        const {userId} = request.body;
        const num = await checkOut(userId);
        response.status(200).json({status: "success", num: num});
    } catch (e) {
        response.status(422).json({status: "failure"});
    }
});

routes.get("/stats", async (request, response) => {
    try {
        const stats = await getStats();
        response.json(stats);
    } catch (e) {
        response.json({status: "failure"});
    }
});

export default routes;