import { storage } from "./app.js";

export async function uploadFile(filePath, destFileName) {
    const response = await storage.upload(filePath, {destination: destFileName});
    return response[0];
}