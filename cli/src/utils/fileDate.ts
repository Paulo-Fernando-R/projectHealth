import { FileDateError, NotFoundError } from "../errors/customErrors.ts";

export class FileDate {
    public getFileDate(fileName: string): string {
        const date = fileName.match(/\d+/g);

        if (!date || date.length === 0) {
            console.log("No date found");
            throw new FileDateError("No date found in file name");
        }

        return date[0];
    }

    public lastFileInDirectory(files: string[]): string {
        if (files.length === 0) {
            throw new NotFoundError("No files found in directory");
        }

        const dates = files.map((e) => {
            return this.getFileDate(e);
        });

        const lastDate = dates.reduce((a, b) => {
            return a > b ? a : b;
        });

        const lastFile = files.find((e) => e.includes(lastDate));

        if (!lastFile) {
            throw new NotFoundError("No last file found in directory");
        }

        return lastFile;
    }
}
