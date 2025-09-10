import fs from "fs";
import { FileDeleteError, NotFoundError } from "../errors/customErrors.ts";
import type { IFileManager } from "./IFileManager.ts";

export class FileManager implements IFileManager {
    listFiles(directory: string) {
        try {
            const res = fs.readdirSync(directory);
            return res;
        } catch (error) {
            throw new NotFoundError("Directory not found");
        }
    }

    deleteFile(directory: string, fileName: string) {
        try {
            fs.unlinkSync(directory + fileName);
            console.log(fileName, ": Deleted");
        } catch (error) {
            throw new FileDeleteError("File not deleted");
        }
    }

    emptyDirectory(directory: string) {
        const files = this.listFiles(directory);
        for (const file of files) {
            this.deleteFile(directory, file);
        }
    }

    emptyDirectoryExcept(directory: string, fileToKeep: string) {
        const files = this.listFiles(directory);
        files.splice(
            files.findIndex((e) => e === fileToKeep),
            1
        );

        for (const file of files) {
            this.deleteFile(directory, file);
        }
    }
}
