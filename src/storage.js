import { storage } from "./app.js";
import fs from "fs";

//upload file and return its public url
export async function uploadFile(filePath, destFileName) {
    const response = await storage.upload(filePath, {destination: destFileName});
    response[0].makePublic();
    return response[0].publicUrl();
}

//delete file from local
export function deleteFileFromLocal(filePath) {
    fs.unlink(filePath, (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`${filePath} removed from local`);
        }
    })
}