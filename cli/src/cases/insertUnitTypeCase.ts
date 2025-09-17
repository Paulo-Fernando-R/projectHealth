import type { IUnitTypeRepository } from "../db/IunitTypeRepository.ts";
import type { ICsvParser } from "../parsers/IcsvParser.ts";
import type { UnitType } from "../models/unitType.ts";
import { InsertBatchError } from "../errors/customErrors.ts";
import type { UnitTypeCsv } from "../models/unitTypeCsv.ts";
import { UnitTypeFromCsv } from "../mappers/unitTypeFromCsv.ts";

export class InsertUnitTypeCase {
    repository: IUnitTypeRepository;
    csvParser: ICsvParser;
    filePath: string;
    tableName: string | undefined;

    constructor(
        repository: IUnitTypeRepository,
        filePath: string,
        csvParser: ICsvParser,
        tableName?: string
    ) {
        this.repository = repository;
        this.filePath = filePath;
        this.csvParser = csvParser;
        this.tableName = tableName;
    }

    async execute() {
        try {
            console.log(`Inserting batch: ${this.filePath}...`);

            const stream = await this.csvParser.parse(this.filePath, ";");
            const list: UnitType[] = [];

            for await (const row of stream as AsyncIterable<UnitTypeCsv>) {
                const parser: UnitType = new UnitTypeFromCsv(row).map();
                list.push(parser);
            }

            await this.repository.insertBatch(list, this.tableName);
            console.log("Batch inserted!");
        } catch (error) {
            throw new InsertBatchError(`Error inserting batch: ${this.filePath} ` + error);
        }
    }
}
