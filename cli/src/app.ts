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
    FileDeleteError,
    FileDateError,
    DatabaseConnectionError,
    WriteFileError,
    InsertFileError,
    ParsingError,
    InsertBatchError,
    DownloadError,
} from "./errors/customErrors.ts";
import type { ConfigType } from "./types/configType.ts";
import { CsvWriter } from "./parsers/csvWriter.ts";
import { CsvParser } from "./parsers/csvParser.ts";
import type { ICsvWriter } from "./parsers/IcsvWriter.ts";
import type { ICsvParser } from "./parsers/IcsvParser.ts";
import { stablishmentHeaders } from "./utils/csvHeaders.ts";
import { StablishmentRepository } from "./db/stablishmentRepository.ts";
import { Connection } from "./db/connection.ts";
import type { IStablishmentRepository } from "./db/IstablishmentRepository.ts";
import type { IConnection } from "./db/Iconnection.ts";
import { tableNames } from "./utils/tableNames.ts";
import { outputFileNames } from "./utils/outputFileNames.ts";
import { UnitTypeRepository } from "./db/unitTypeRepository.ts";
import { WriteAllCase } from "./cases/writeAllCase.ts";
import { InsertAllCase } from "./cases/insertAllCase.ts";
import type { IUnitTypeRepository } from "./db/IunitTypeRepository.ts";
import type { ICityRepository } from "./db/IcityRepository.ts";
import { CityRepository } from "./db/cityRepository.ts";
import type { ILegalNatureRepository } from "./db/IlegalNatureRepository.ts";
import { LegalNatureRepository } from "./db/legalNatureRepository.ts";
import type { IServiceRepository } from "./db/IserviceRepository.ts";
import { ServiceRepository } from "./db/serviceRepository.ts";
import type { IStablishmentServiceRepository } from "./db/IstablishmentServiceRepository.ts";
import { StablishmentServiceRepository } from "./db/stablishmentServiceRepository.ts";
import type { IOpeningHoursRepository } from "./db/IopeningHoursRepository.ts";
import { OpeningHoursRepository } from "./db/openingHoursRepository.ts";
import type { RowDataPacket } from "mysql2/promise";
import type { CountRowType } from "./types/countRowType.ts";

export class App {
    fileManager: IFileManager;
    fileDate: FileDate;
    zip: Zip;
    appconfig: ConfigType;
    csvParser: ICsvParser;
    stablishmentRepository: IStablishmentRepository;
    unitTypeRepository: IUnitTypeRepository;
    cityRepository: ICityRepository;
    legalNatureRepository: ILegalNatureRepository;
    serviceRepository: IServiceRepository;
    stablishmentServiceRepository: IStablishmentServiceRepository;
    openingHoursRepository: IOpeningHoursRepository;
    connection: IConnection;
    tableNames = tableNames;
    outputFileNames = outputFileNames;

    constructor() {
        this.fileManager = new FileManager();
        this.fileDate = new FileDate();
        this.zip = new Zip(this.fileManager);
        this.appconfig = appConfig;
        this.csvParser = new CsvParser();
        this.connection = new Connection(appConfig);
        this.stablishmentRepository = new StablishmentRepository(appConfig, this.connection);
        this.unitTypeRepository = new UnitTypeRepository(appConfig, this.connection);
        this.cityRepository = new CityRepository(appConfig, this.connection);
        this.legalNatureRepository = new LegalNatureRepository(appConfig, this.connection);
        this.serviceRepository = new ServiceRepository(appConfig, this.connection);
        this.stablishmentServiceRepository = new StablishmentServiceRepository(
            appConfig,
            this.connection
        );

        this.openingHoursRepository = new OpeningHoursRepository(appConfig, this.connection);
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
                "\n\n\n-------------------------------Starting process...---------------------------------------\n"
            );

            const startTime = performance.now();
            const attr = await new ScrapeCase(scraping).execute();

            console.log(`File to download: `, attr);

            await new DownloadCase(scraping).execute(attr.href, this.appconfig.zipPath);

            new UnzipCase(this.zip).execute(
                this.appconfig.zipPath + attr.text,
                this.appconfig.unzipPath
            );

            await new WriteAllCase(this.csvParser, appConfig, this.fileManager).execute();

            await new InsertAllCase(
                this.stablishmentRepository,
                this.unitTypeRepository,
                this.cityRepository,
                this.legalNatureRepository,
                this.serviceRepository,
                this.stablishmentServiceRepository,
                this.openingHoursRepository,
                appConfig,
                this.csvParser,
                this.fileManager
            ).execute();

            const endTime = performance.now();

            let duration = endTime - startTime;
            duration = duration / 1000;

            console.log(
                "--------------------------Process completed successfully!----------------------------------"
            );
            console.log(`Execution time: ${duration} seconds`);
        } catch (error) {
            console.log(
                "--------------------------Process completed with errors!----------------------------------"
            );
            if (error instanceof NotFoundError) {
                console.error("Custom NotFoundError caught:", error.message);
            } else if (error instanceof DownloadError) {
                console.error("Custom DownloadError caught:", error.message);
                await this.run();
            } else if (error instanceof DescompressionError) {
                console.error("Custom DescompressionError caught:", error.message);
            } else if (error instanceof FileAlreadyNewerError) {
                console.warn("Custom FileAlreadyNewerError caught:", error.message);
            } else if (error instanceof FileDeleteError) {
                console.error("Custom FileDeleteError caught:", error.message);
            } else if (error instanceof FileDateError) {
                console.error("Custom FileDateError caught:", error.message);
            } else if (error instanceof DatabaseConnectionError) {
                console.error("Custom DatabaseConnectionError caught:", error.message);
            } else if (error instanceof WriteFileError) {
                console.error("Custom WriteFileError caught:", error.message);
            } else if (error instanceof InsertFileError) {
                console.error("Custom InsertFileError caught:", error.message);
            } else if (error instanceof ParsingError) {
                console.error("Custom ParsingError caught:", error.message);
            } else if (error instanceof InsertBatchError) {
                console.error("Custom InsertBatchError caught:", error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        } finally {
            await this.connection.disconnect();
        }
    }
}
