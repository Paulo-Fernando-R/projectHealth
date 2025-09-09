import { DescompressionError, NotFoundError } from "./errors/customErrors.ts";
import { DownloadCase } from "./cases/downloadCase.ts";
import { ScrapeCase } from "./cases/scrapeCase.ts";
import { Scraping } from "./scraping/scraping.ts";
import { UnzipCase } from "./cases/unzipCase.ts";
import { Zip } from "./parsers/zip.ts";

export class App {
    async run() {
        const scraping = new Scraping(
            "https://cnes.datasus.gov.br/pages/downloads/arquivosBaseDados.jsp",
            "https://cnes.datasus.gov.br/"
            //!TODO get from env variable
        );

        try {
            const attr = await new ScrapeCase(scraping).execute();

            await new DownloadCase(scraping).execute(attr!.href!, "./files");

            new UnzipCase(new Zip()).execute(
                "./files/BASE_DE_DADOS_CNES_202507.ZIP",
                "./files/unzip"
                //!TODO get dinamically with fs
            );
            
        } catch (error) {
            if (error instanceof NotFoundError) {
                console.error("Custom NotFoundError caught:", error.message);
            } else if (error instanceof DescompressionError) {
                console.error("Custom DescompressionError caught:", error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }
}
