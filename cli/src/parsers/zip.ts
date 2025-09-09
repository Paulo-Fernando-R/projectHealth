import AdmZip from "adm-zip";

export class Zip {
    public static unzip(filePath: string, extractTo: string) {
        const zip = new AdmZip(filePath);

        console.log("Unzipping file...");
        zip.extractAllTo(extractTo, true);
        console.log("File unzipped!");
    }
}
