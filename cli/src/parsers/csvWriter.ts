import { WriteFileError } from "../errors/customErrors.ts";
import type { ICsvWriter } from "./IcsvWriter.ts";
import fs from "fs";

export class CsvWriter implements ICsvWriter {
    outputFile: string;
    headers?: string[];
    writeStream: fs.WriteStream;

    constructor(outputFile: string, headers?: string[]) {
        this.outputFile = outputFile;
        this.verifyDirectory();
        this.writeStream = fs.createWriteStream(outputFile);

        if (headers) {
            this.headers = headers;
            this.writeStream.write(headers.join(",") + "\n");
        }
    }

    set Headers(headers: string[]) {
        this.headers = headers;
        this.writeStream.write(headers.join(",") + "\n");
    }

    write(line: string) {
        try {
            this.writeStream.write(line + "\n");
        } catch (error) {
            throw new WriteFileError("Error writing to file: " + this.outputFile + error);
        }
    }

    close() {
        this.writeStream.close();
    }

    private async verifyDirectory() {
        const dir = this.outputFile.substring(0, this.outputFile.lastIndexOf("/"));
        if (fs.existsSync(dir)) {
            {
                return;
            }
        }
        fs.mkdirSync(dir);
    }
}
