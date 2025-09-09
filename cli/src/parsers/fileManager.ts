import fs from "fs";
import { FileDeleteError, NotFoundError } from "../errors/customErrors.ts";
import type { IFileManager } from "./IFileManager.ts";

export class FileManager implements IFileManager {
    listFiles(directory = "./files/") {
        try {
            const res = fs.readdirSync(directory);
            return res;
        } catch (error) {
            throw new NotFoundError("Directory not found");
        }
    }

    deleteFile(directory = "./files/", fileName: string) {
        try {
            fs.unlinkSync(directory + fileName);
            console.log("Deleted");
        } catch (error) {
            throw new FileDeleteError("File not deleted");
        }
    }
}
