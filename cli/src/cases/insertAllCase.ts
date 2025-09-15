import type { IStablishmentRepository } from "../db/IstablishmentRepository.ts";
import type { IUnitTypeRepository } from "../db/IunitTypeRepository.ts";
import { UnitTypeRepository } from "../db/unitTypeRepository.ts";
import type { ICsvParser } from "../parsers/IcsvParser.ts";
import type { ConfigType } from "../types/configType.ts";
import { outputFileNames } from "../utils/outputFileNames.ts";
import { InsertStablishmentsCase } from "./insertStablishmentsCase.ts";
import { InsertUnitTypeCase } from "./insertUnitTypeCase.ts";

export class InsertAllCase {
    stablishmentRepository: IStablishmentRepository;
    unitTypeepository: IUnitTypeRepository;
    appConfig: ConfigType;
    csvParser: ICsvParser;

    constructor(
        stablishmentRepository: IStablishmentRepository,
        unitTypeepository: IUnitTypeRepository,
        appConfig: ConfigType,
        csvParser: ICsvParser
    ) {
        this.stablishmentRepository = stablishmentRepository;
        this.unitTypeepository = unitTypeepository;
        this.appConfig = appConfig;
        this.csvParser = csvParser;
    }

    async execute() {
        const unitTypeFile = this.appConfig.outputPath + outputFileNames.unitType;
        const stablishmentFile = this.appConfig.outputPath + outputFileNames.stablishment;

        //
        await new InsertUnitTypeCase(
            this.unitTypeepository,
            unitTypeFile,
            this.csvParser
        ).execute();
        await new InsertStablishmentsCase(this.stablishmentRepository, stablishmentFile).execute();
    }
}
