import type { ICityRepository } from "../db/IcityRepository.ts";
import { InsertBatchError } from "../errors/customErrors.ts";
import { CityFromCsv } from "../mappers/cityFromCsv.ts";
import type { City } from "../models/city.ts";
import type { CityCsv } from "../models/cityCsv.ts";
import type { ICsvParser } from "../parsers/IcsvParser.ts";

export class InsertCityCase {
    repository: ICityRepository;
    csvParser: ICsvParser;
    filePath: string;

    constructor(repository: ICityRepository, filePath: string, csvParser: ICsvParser) {
        this.repository = repository;
        this.filePath = filePath;
        this.csvParser = csvParser;
    }

    async execute() {
        try {
            console.log(`Inserting batch: ${this.filePath}...`);
            const stream = await this.csvParser.parse(this.filePath);

            const list: City[] = [];

            for await (const row of stream as AsyncIterable<CityCsv>) {
                
                const parser: City = new CityFromCsv(row).map();
                list.push(parser);

                if (list.length >= 1000) {
                    await this.repository.insertBatch(list);
                    list.length = 0;
                }
            }

            if (list.length > 0) {
                await this.repository.insertBatch(list);
            }

            console.log("Batch inserted!\n");
        } catch (error) {
            throw new InsertBatchError(`Error inserting batch: ${this.filePath} ` + error);
        }
    }
}
