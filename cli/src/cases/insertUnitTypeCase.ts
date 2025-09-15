import type { IUnitTypeRepository } from "../db/IunitTypeRepository.ts";
import type { ICsvParser } from "../parsers/IcsvParser.ts";
import type { UnitType } from "../models/unitType.ts";
import { InsertBatchError } from "../errors/customErrors.ts";

export class InsertUnitTypeCase {
    repository: IUnitTypeRepository;
    csvParser: ICsvParser;
    filePath: string;

    constructor(repository: IUnitTypeRepository, filePath: string, csvParser: ICsvParser) {
        this.repository = repository;
        this.filePath = filePath;
        this.csvParser = csvParser;
    }

    async execute() {
        try {
            console.log(`Inserting batch: ${this.filePath}...`);

            const stream = await this.csvParser.parse(this.filePath, ",");
            const list: UnitType[] = [];

            for await (const row of stream as AsyncIterable<UnitType>) {
                list.push(row);
            }
            await this.repository.insertBatch(list);
            console.log("Batch inserted!");
        } catch (error) {
            throw new InsertBatchError(`Error inserting batch: ${this.filePath} ` + error);
        }
    }
}
