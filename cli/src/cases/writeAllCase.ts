import type { ICsvParser } from "../parsers/IcsvParser.ts";
import type { ConfigType } from "../types/configType.ts";
import { CsvWriter } from "../parsers/csvWriter.ts";
import { WriteStablishmentsFileCase } from "./writeStablishmentsFileCase.ts";
import { WriteUnitTypeCase } from "./writeUnitTypeCase.ts";
import { outputFileNames } from "../utils/outputFileNames.ts";
import { stablishmentHeaders, unitTypeHeaders } from "../utils/csvHeaders.ts";
import type { IFileManager } from "../parsers/IFileManager.ts";
import { tableNames } from "../utils/tableNames.ts";

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
        const unitTypeWriter = new CsvWriter(
            this.appConfig.outputPath + outputFileNames.unitType,
            unitTypeHeaders
        );
        const stablishmentWriter = new CsvWriter(
            this.appConfig.outputPath + outputFileNames.stablishment,
            stablishmentHeaders
        );

        //
        const unitTypeFile = this.fileManager.findFile(
            this.appConfig.unzipPath,
            tableNames.unitType
        );
        const stablishmentFile = this.fileManager.findFile(
            this.appConfig.unzipPath,
            tableNames.stablishment
        );

        //
        await new WriteUnitTypeCase(
            this.csvParser,
            unitTypeWriter,
            this.appConfig.unzipPath + unitTypeFile
        ).execute();

        await new WriteStablishmentsFileCase(
            this.csvParser,
            stablishmentWriter,
            this.appConfig.unzipPath + stablishmentFile
        ).execute();
    }
}
