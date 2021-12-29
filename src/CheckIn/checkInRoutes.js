import express from "express";
import { checkIn, checkOut } from "./checkInFunctions.js";

const routes = express.Router();

routes.post("/check-in", async (request, response) => {
    try {
        const num = await checkIn();
        response.status(200).json({status: "success", num: num});
    } catch (e) {
        response.status(422).json({status: "failure"});
    }
});

routes.post("/check-out", async (request, response) => {
    try {
        const num = await checkOut();
        response.status(200).json({status: "success", num: num});
    } catch (e) {
        response.status(422).json({status: "failure"});
    }
});

export default routes;