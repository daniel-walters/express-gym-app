import express from "express";
import uploadReportImage from "./reportImageUpload.js"
import {
    getAllReports,
    getReportById,
    createReport,
    updateReportById
} from "./reportFunctions.js";

import { deleteFileFromLocal, uploadFile } from "../storage.js";

const routes = express.Router();

routes.get("/", async (req, res) => {
    try {
        let reports = await getAllReports();
        res.status(200).json(reports);
    } catch (err) {
        res.json({
            error: err.message
        });
    }
})

routes.get("/:id", async (req, res) => {
    try {
        let report = await getReportById(req.params.id);
        res.status(201).json(report);
    } catch (err) {
        res.json({
            error: err.message
        });
    }
})

//IMPORTANT: the name of image file input tag must match "reportImage" on front end 
//for the front-end <form> setting, add enctype ="multipart/form-data" to accept the FormData
routes.post("/", uploadReportImage.single("reportImage"), async (req, res) => {

    let url = "";

    if (req.file) {
        url = await uploadFile(req.file.path, req.file.originalname).catch((error) => console.log(error));
        deleteFileFromLocal(req.file.path);
    }
    
    try {
        let report = await createReport({
            type: req.body.type,
            description: req.body.description,
            // Multer adds a file object to the request object. The file object contains the files uploaded via the form.
            reportImage: url ? url : null
        });
        res.status(201).json(report);
    } catch (err) {
        res.json({
            error: err.message
        });
    }
})

routes.put("/:id", uploadReportImage.single("reportImage"), async (req, res) => {
    let url = "";
    
    if (req.file) {
        url = await uploadFile(req.file.path, req.file.originalname).catch((error) => console.log(error));
        deleteFileFromLocal(req.file.path);
    }

    try {
        let updateReportDetails = {
            type: req.body.type,
            description: req.body.description,
            resolved: req.body.resolved,
            reportDate: req.body.reportDate,
            reportImage: url ? url : null
        };
        let report = await updateReportById(
            req.params.id,
            updateReportDetails
        );
        res.status(200).json(report);
    } catch (err) {
        res.json({
            error: err.message
        });
    }
})

routes.delete("/:id", async (req, res) => {
    try {
        let report = await getReportById(req.params.id);
        await report.remove();
        res.status(200).json({
            message: "Deleted Report"
        });
    } catch (err) {
        res.json({
            error: err.message
        });
    }
})


export default routes;