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
import { WriteStablishmentsFileCase } from "./cases/writeStablishmentsFileCase.ts";
import { CsvWriter } from "./parsers/csvWriter.ts";
import { CsvParser } from "./parsers/csvParser.ts";
import type { ICsvWriter } from "./parsers/IcsvWriter.ts";
import type { ICsvParser } from "./parsers/IcsvParser.ts";
import { stablishmentHeaders, unitTypeHeaders } from "./utils/csvHeaders.ts";
import { StablishmentRepository } from "./db/stablishmentRepository.ts";
import { Connection } from "./db/connection.ts";
import { InsertStablishmentsCase } from "./cases/insertStablishmentsCase.ts";
import type { IStablishmentRepository } from "./db/IstablishmentRepository.ts";
import type { IConnection } from "./db/Iconnection.ts";
import { tableNames } from "./utils/tableNames.ts";
import { outputFileNames } from "./utils/outputFileNames.ts";
import { WriteUnitTypeCase } from "./cases/writeUnitTypeCase.ts";

export class App {
    fileManager: IFileManager;
    fileDate: FileDate;
    zip: Zip;
    appconfig: ConfigType;
    csvWriter: ICsvWriter;
    csvParser: ICsvParser;
    stablishmentRepository: IStablishmentRepository;
    connection: IConnection;
    tableNames = tableNames;
    outputFileNames = outputFileNames;

    constructor() {
        this.fileManager = new FileManager();
        this.fileDate = new FileDate();
        this.zip = new Zip(this.fileManager);
        this.appconfig = appConfig;

        this.csvWriter = new CsvWriter(
            appConfig.outputPath + "stablishments.csv",
            stablishmentHeaders
        );

        this.csvParser = new CsvParser();
        this.connection = new Connection(appConfig);
        this.stablishmentRepository = new StablishmentRepository(appConfig, this.connection);
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
            console.log(
                "-------------------------------Starting process...---------------------------------"
            );
            //const attr = await new ScrapeCase(scraping).execute();

            // console.log(`File to download: `, attr);

            //  await new DownloadCase(scraping).execute(attr.href, this.appconfig.zipPath);

            // new UnzipCase(this.zip).execute(
            //     this.appconfig.zipPath + "BASE_DE_DADOS_CNES_202507.ZIP", //attr.text,
            //     this.appconfig.unzipPath
            // );

            const tbName = this.fileManager.findFile(
                appConfig.unzipPath,
                this.tableNames.stablishment
            );

            await new WriteStablishmentsFileCase(
                this.csvParser,
                this.csvWriter,
                appConfig.unzipPath + tbName //"tbEstabelecimento202507.csv"
            ).execute();

            ////////////////////////////////////

            const writer1 = new CsvWriter(
                appConfig.outputPath + outputFileNames.unitType,
                unitTypeHeaders
            );
            const tbName1 = this.fileManager.findFile(
                appConfig.unzipPath,
                this.tableNames.unitType
            );

            await new WriteUnitTypeCase(
                this.csvParser,
                writer1,
                appConfig.unzipPath + tbName1
            ).execute();
            /////////////////////////////////////

            const outFName = this.outputFileNames.stablishment;
            await new InsertStablishmentsCase(
                this.stablishmentRepository,
                appConfig.outputPath + outFName
                //"./files/output/stablishments.csv"
            ).execute();

            console.log(
                "--------------------------Process completed successfully!----------------------------------"
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
            //!TODO Handle all custom errors
        }
    }
}
