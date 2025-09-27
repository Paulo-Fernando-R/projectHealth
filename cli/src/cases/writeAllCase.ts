import type { ICsvParser } from "../parsers/IcsvParser.ts";
import type { ConfigType } from "../types/configType.ts";
import { CsvWriter } from "../parsers/csvWriter.ts";
import { WriteStablishmentsFileCase } from "./writeStablishmentsFileCase.ts";
import { outputFileNames } from "../utils/outputFileNames.ts";
import {
    openingHoursHeaders,
    stablishmentHeaders,
    stablishmentServiceHeaders,
} from "../utils/csvHeaders.ts";
import type { IFileManager } from "../parsers/IFileManager.ts";
import { tableNames } from "../utils/tableNames.ts";
import { WriteStablishmentServicesFileCase } from "./writeStablishmentServicesFileCase.ts";
import { WriteOpeningHoursFileCase } from "./writeOpeningHoursFileCase.ts";

export class WriteAllCase {
    csvParser: ICsvParser;
    appConfig: ConfigType;
    fileManager: IFileManager;

    constructor(csvParser: ICsvParser, appConfig: ConfigType, fileManager: IFileManager) {
        this.csvParser = csvParser;
        this.appConfig = appConfig;
        this.fileManager = fileManager;
    }

    private async run(control: number) {
        try {
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

            const openingHoursWriter = new CsvWriter(
                this.appConfig.outputPath + outputFileNames.openingHours,
                openingHoursHeaders
            );

            const openingHoursFile = this.fileManager.findFile(
                this.appConfig.unzipPath,
                tableNames.openingHours
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

            await new WriteOpeningHoursFileCase(
                this.csvParser,
                openingHoursWriter,
                this.appConfig.unzipPath + openingHoursFile
            ).execute();
        } catch (error) {
            if (control < 10) await this.run(control + 1);
            else throw error;
        }
    }

    async execute() {
        let control = 0;
        try {
            await this.run(control);
        } catch (error) {
            throw error;
        }
    }
}
