import AdmZip from "adm-zip";
import type { IZip } from "./Izip.ts";
import { DescompressionError } from "../errors/customErrors.ts";

export class Zip implements IZip {
    public unzip(filePath: string, extractTo: string) {
        try {
            const zip = new AdmZip(filePath);

            console.log("Unzipping file...");
            zip.extractAllTo(extractTo, true);
            console.log("File unzipped!");
        } catch (error) {
            throw new DescompressionError("Error during file decompression");
        }
    }
}
