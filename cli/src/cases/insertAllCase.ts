import type { IStablishmentRepository } from "../db/IstablishmentRepository.ts";
import type { IUnitTypeRepository } from "../db/IunitTypeRepository.ts";
import { UnitTypeRepository } from "../db/unitTypeRepository.ts";
import type { ICsvParser } from "../parsers/IcsvParser.ts";
import type { ConfigType } from "../types/configType.ts";
import { outputFileNames } from "../utils/outputFileNames.ts";
import { InsertStablishmentsCase } from "./insertStablishmentsCase.ts";
import { InsertUnitTypeCase } from "./insertUnitTypeCase.ts";
import { tableNames } from "../utils/tableNames.ts";
import type { IFileManager } from "../parsers/IFileManager.ts";
export class InsertAllCase {
    stablishmentRepository: IStablishmentRepository;
    unitTypeepository: IUnitTypeRepository;
    appConfig: ConfigType;
    csvParser: ICsvParser;
    fileManager: IFileManager;

    constructor(
        stablishmentRepository: IStablishmentRepository,
        unitTypeepository: IUnitTypeRepository,
        appConfig: ConfigType,
        csvParser: ICsvParser,
        fileManager: IFileManager
    ) {
        this.stablishmentRepository = stablishmentRepository;
        this.unitTypeepository = unitTypeepository;
        this.appConfig = appConfig;
        this.csvParser = csvParser;
        this.fileManager = fileManager;
    }

    async execute() {
        const unitTypeFile =
            this.appConfig.unzipPath +
            this.fileManager.findFile(this.appConfig.unzipPath, tableNames.unitType);

        const stablishmentTypeFile =
            this.appConfig.unzipPath +
            this.fileManager.findFile(this.appConfig.unzipPath, tableNames.stablishmentType);
            
        const stablishmentFile = this.appConfig.outputPath + outputFileNames.stablishment;

        //
        await new InsertUnitTypeCase(
            this.unitTypeepository,
            unitTypeFile,
            this.csvParser
        ).execute();

        await new InsertUnitTypeCase(
            this.unitTypeepository,
            stablishmentTypeFile,
            this.csvParser,
            Object.keys(tableNames).find(
                (key) => tableNames[key as keyof typeof tableNames] === tableNames.stablishmentType
            )
        ).execute();

        await new InsertStablishmentsCase(this.stablishmentRepository, stablishmentFile).execute();
    }
}
