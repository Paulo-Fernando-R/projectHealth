import type { IFileManager } from "../parsers/IFileManager.ts";
import type { FileDate } from "../utils/fileDate.ts";

export class LastFileCase {
    fileManager: IFileManager;
    fileDate: FileDate;

    constructor(fileManager: IFileManager, fileDate: FileDate) {
        this.fileManager = fileManager;
        this.fileDate = fileDate;
    }

    public execute(directory = "./files/zip"): string | null {
        const files = this.fileManager.listFiles(directory);

        if (files.length === 0) {
            return null;
        }

        return this.fileDate.lastFileInDirectory(files);
    }
}
