import type { IFileManager } from "./parsers/IFileManager.ts";
import { FileManager } from "./parsers/fileManager.ts";
import { DownloadCase } from "./cases/downloadCase.ts";
import { ScrapeCase } from "./cases/scrapeCase.ts";
import { Scraping } from "./scraping/scraping.ts";
import { UnzipCase } from "./cases/unzipCase.ts";
import { FileDate } from "./utils/fileDate.ts";
import { appConfig } from "./app.config.ts";
import { Zip } from "./parsers/zip.ts";
import {
    FileAlreadyNewerError,
    DescompressionError,
    NotFoundError,
} from "./errors/customErrors.ts";

export class App {
    scrapeUrl: string;
    downloadUrl: string;
    fileManager: IFileManager;
    fileDate: FileDate;
    zipPath: string;
    unzipPath: string;
    zip: Zip;
    scrapeElement: string;

    constructor() {
        this.scrapeUrl = appConfig.scrapeUrl;
        this.downloadUrl = appConfig.downloadUrl;
        this.fileManager = new FileManager();
        this.fileDate = new FileDate();
        this.zipPath = appConfig.zipPath;
        this.unzipPath = appConfig.unzipPath;
        this.zip = new Zip(this.fileManager);
        this.scrapeElement = appConfig.scrapeElement;
    }

    async run() {
        const scraping = new Scraping(
            this.scrapeUrl,
            this.downloadUrl,
            this.fileManager,
            this.fileDate,
            this.scrapeElement,
            this.zipPath
        );

        try {
            const attr = await new ScrapeCase(scraping).execute();

            console.log(`File to download: `, attr);

            await new DownloadCase(scraping).execute(attr.href, this.zipPath);

            new UnzipCase(this.zip).execute(this.zipPath + attr.text, this.unzipPath);

            console.log("Process completed successfully!");
        } catch (error) {
            if (error instanceof NotFoundError) {
                console.error("Custom NotFoundError caught:", error.message);
            } else if (error instanceof DescompressionError) {
                console.error("Custom DescompressionError caught:", error.message);
            } else if (error instanceof FileAlreadyNewerError) {
                console.warn("Custom FileAlreadyNewerError caught:", error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }
}
