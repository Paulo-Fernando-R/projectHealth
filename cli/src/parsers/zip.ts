import AdmZip from "adm-zip";
import type { IZip } from "./Izip.ts";
import { DescompressionError } from "../errors/customErrors.ts";
import type { IFileManager } from "./IFileManager.ts";

export class Zip implements IZip {
    public fileManager: IFileManager;

    constructor(fileManager: IFileManager) {
        this.fileManager = fileManager;
    }

    public unzip(filePath: string, extractTo: string) {
        try {
            const zip = new AdmZip(filePath);

            try {
                this.fileManager.emptyDirectory(extractTo);
            } catch (error) {
                console.log("Directory does not exist, creating...");
            }

            console.log("Unzipping file...");
            zip.extractAllTo(extractTo, true);
            //!TODO remove
            this.fileManager.deleteFile(
                filePath.substring(0, filePath.lastIndexOf("/")),
                filePath.substring(filePath.lastIndexOf("/"))
            );
            console.log("File unzipped!");
        } catch (error) {
            throw new DescompressionError("Error during file decompression");
        }
    }
}
