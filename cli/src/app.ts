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
import type { ConfigType } from "./types/configType.ts";

export class App {
    fileManager: IFileManager;
    fileDate: FileDate;
    zip: Zip;
    appconfig: ConfigType;

    constructor() {
        this.fileManager = new FileManager();
        this.fileDate = new FileDate();
        this.zip = new Zip(this.fileManager);
        this.appconfig = appConfig;
    }

    async run() {
        const scraping = new Scraping(
            this.appconfig.scrapeUrl,
            this.appconfig.downloadUrl,
            this.fileManager,
            this.fileDate,
            this.appconfig.scrapeElement,
            this.appconfig.zipPath
        );

        try {
            const attr = await new ScrapeCase(scraping).execute();

            console.log(`File to download: `, attr);

            await new DownloadCase(scraping).execute(attr.href, this.appconfig.zipPath);

            new UnzipCase(this.zip).execute(
                this.appconfig.zipPath + attr.text,
                this.appconfig.unzipPath
            );

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
