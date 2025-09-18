import type { ICsvParser } from "../parsers/IcsvParser.ts";
import type { ConfigType } from "../types/configType.ts";
import { CsvWriter } from "../parsers/csvWriter.ts";
import { WriteStablishmentsFileCase } from "./writeStablishmentsFileCase.ts";
import { outputFileNames } from "../utils/outputFileNames.ts";
import { stablishmentHeaders, stablishmentServiceHeaders } from "../utils/csvHeaders.ts";
import type { IFileManager } from "../parsers/IFileManager.ts";
import { tableNames } from "../utils/tableNames.ts";
import { WriteStablishmentServicesFileCase } from "./writeStablishmentServicesFileCase.ts";

export class WriteAllCase {
    csvParser: ICsvParser;
    appConfig: ConfigType;
    fileManager: IFileManager;

    constructor(csvParser: ICsvParser, appConfig: ConfigType, fileManager: IFileManager) {
        this.csvParser = csvParser;
        this.appConfig = appConfig;
        this.fileManager = fileManager;
    }

    async execute() {
        const stablishmentWriter = new CsvWriter(
            this.appConfig.outputPath + outputFileNames.stablishment,
            stablishmentHeaders
        );

        const stablishmentFile = this.fileManager.findFile(
            this.appConfig.unzipPath,
            tableNames.stablishment
        );

        const stablishmentServiceWriter = new CsvWriter(
            this.appConfig.outputPath + outputFileNames.stablishmentService,
            stablishmentServiceHeaders
        );

        const stablishmentServiceFile = this.fileManager.findFile(
            this.appConfig.unzipPath,
            tableNames.stablishmentService
        );

        await new WriteStablishmentsFileCase(
            this.csvParser,
            stablishmentWriter,
            this.appConfig.unzipPath + stablishmentFile
        ).execute();

        await new WriteStablishmentServicesFileCase(
            this.csvParser,
            stablishmentServiceWriter,
            this.appConfig.unzipPath + stablishmentServiceFile
        ).execute();
    }
}
