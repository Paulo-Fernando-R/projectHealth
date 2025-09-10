import { DownloadCase } from "./cases/downloadCase.ts";
import { ScrapeCase } from "./cases/scrapeCase.ts";
import { Scraping } from "./scraping/scraping.ts";
import { UnzipCase } from "./cases/unzipCase.ts";
import { Zip } from "./parsers/zip.ts";
import {
    FileAlreadyNewerError,
    DescompressionError,
    NotFoundError,
} from "./errors/customErrors.ts";
import { FileManager } from "./parsers/fileManager.ts";
import { FileDate } from "./utils/fileDate.ts";

export class App {
    async run() {
        const scraping = new Scraping(
            "https://cnes.datasus.gov.br/pages/downloads/arquivosBaseDados.jsp",
            "https://cnes.datasus.gov.br/",
            new FileManager(),
            new FileDate()
            //!TODO get from env variable
        );

        try {
            const attr = await new ScrapeCase(scraping).execute();

            console.log(`File to download: `, attr);

            await new DownloadCase(scraping).execute(attr.href, "./files/zip/");

            new UnzipCase(new Zip(new FileManager())).execute(
                "./files/zip/" + attr.text,
                "./files/unzip/"
            );
            
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
