import fs from "fs";
export interface ICsvWriter {
    outputFile: string;
    headers?: string[];
    writeStream: fs.WriteStream;
    Headers: string[];

    close(): void;

    write( line: string): void;
}
