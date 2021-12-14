import express from "express";
import uploadEventImage from "./eventImageUpload.js"
import {
    getAllEvents,
    getEventById,
    createEvent,
    updateEventById,
} from './eventFunctions.js'

const routes = express.Router();

routes.get("/", async (req, res) => {
    try {
        let events = await getAllEvents();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
})

routes.get("/:id", async (req, res) => {
    try {
        let event = await getEventById(req.params.id);
        res.status(201).json(event);
    } catch (err) {
        res.status(422).json({
            message: err.message
        });
    }
})

routes.post("/",uploadEventImage.single("eventImage"), async (req, res) => {
    console.log(req.file)

    try {
        let event = await createEvent({
            name: req.body.name, 
            description: req.body.description,
            startTime: req.body.startTime,
            endTime:req.body.endTime,
            registeredUsers:req.body.registeredUsers,
            spotsAvailable: req.body.spotsAvailable,
            category: req.body.category,
            eventImage: req.file? req.file.originalname: null
        });
        res.status(201).json(event);
    } catch (err) {
        res.status(422).json({
            message: err.message
        });
    }
})


routes.put("/:id", uploadEventImage.single("eventImage"), async (req, res) => {
    try {
        let updateEventDetails = {
            name: req.body.name, 
            description: req.body.description,
            startTime: req.body.startTime,
            endTime:req.body.endTime,
            registeredUsers:req.body.registeredUsers,
            spotsAvailable: req.body.spotsAvailable,
            category: req.body.category,
            eventImage: req.file? req.file.originalname: null
        };
        let report = await updateEventById(
            req.params.id,
            updateEventDetails
        );
        res.status(200).json(report);
    } catch (err) {
        res.status(422).json({
            message: err.message
        });
    }
})

routes.delete("/:id", async (req, res) => {
    try {
        let event = await getEventById(req.params.id);
        await event.remove();
        res.status(200).json({
            message: "Deleted Event"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
})


export default routes;