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
import { InsertCityCase } from "./insertCityCase.ts";
import type { ICityRepository } from "../db/IcityRepository.ts";
import { InsertLegalNatureCase } from "./insertLegaNatureCase.ts";
import type { ILegalNatureRepository } from "../db/IlegalNatureRepository.ts";
import type { IServiceRepository } from "../db/IserviceRepository.ts";
import { InsertServiceCase } from "./insertServiceCase.ts";
import type { IStablishmentServiceRepository } from "../db/IstablishmentServiceRepository.ts";
import { InsertStablishmentServicesCase } from "./insertStablishmentServicesCase.ts";
export class InsertAllCase {
    stablishmentRepository: IStablishmentRepository;
    unitTypeepository: IUnitTypeRepository;
    cityRepository: ICityRepository;
    legalNatureRepository: ILegalNatureRepository;
    serviceRepository: IServiceRepository;
    stablishmentServiceRepository: IStablishmentServiceRepository;
    appConfig: ConfigType;
    csvParser: ICsvParser;
    fileManager: IFileManager;

    constructor(
        stablishmentRepository: IStablishmentRepository,
        unitTypeepository: IUnitTypeRepository,
        cityRepository: ICityRepository,
        legalNatureRepository: ILegalNatureRepository,
        serviceRepository: IServiceRepository,
        stablishmentServiceRepository: IStablishmentServiceRepository,
        appConfig: ConfigType,
        csvParser: ICsvParser,
        fileManager: IFileManager
    ) {
        this.stablishmentRepository = stablishmentRepository;
        this.unitTypeepository = unitTypeepository;
        this.cityRepository = cityRepository;
        this.legalNatureRepository = legalNatureRepository;
        this.serviceRepository = serviceRepository;
        this.stablishmentServiceRepository = stablishmentServiceRepository;
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

        const cityFile =
            this.appConfig.unzipPath +
            this.fileManager.findFile(this.appConfig.unzipPath, tableNames.city);

        const legalNatureFile =
            this.appConfig.unzipPath +
            this.fileManager.findFile(this.appConfig.unzipPath, tableNames.legalNature);

        const serviceFile =
            this.appConfig.unzipPath +
            this.fileManager.findFile(this.appConfig.unzipPath, tableNames.service);

        const stablishmentFile = this.appConfig.outputPath + outputFileNames.stablishment;

        const stablishmentServiceFile =
            this.appConfig.outputPath + outputFileNames.stablishmentService;
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

        await new InsertCityCase(this.cityRepository, cityFile, this.csvParser).execute();

        await new InsertLegalNatureCase(
            this.legalNatureRepository,
            legalNatureFile,
            this.csvParser
        ).execute();

        await new InsertServiceCase(this.serviceRepository, serviceFile, this.csvParser).execute();

        await new InsertStablishmentsCase(this.stablishmentRepository, stablishmentFile).execute();

        await new InsertStablishmentServicesCase(
            this.stablishmentServiceRepository,
            stablishmentServiceFile
        ).execute();
    }
}
