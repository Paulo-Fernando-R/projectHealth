import type { IServiceRepository } from "../db/IserviceRepository.ts";
import { InsertBatchError } from "../errors/customErrors.ts";
import { ServiceFromCsv } from "../mappers/serviceFromCsv.ts";
import type { Service } from "../models/service.ts";
import type { ServiceCsv } from "../models/serviceCsv.ts";
import type { ICsvParser } from "../parsers/IcsvParser.ts";

export class InsertServiceCase {
    repository: IServiceRepository;
    csvParser: ICsvParser;
    filePath: string;

    constructor(repository: IServiceRepository, filePath: string, csvParser: ICsvParser) {
        this.repository = repository;
        this.filePath = filePath;
        this.csvParser = csvParser;
    }

    async execute() {
        try {
            console.log(`Inserting batch: ${this.filePath}...`);
            const stream = await this.csvParser.parse(this.filePath, ";");
            const list: Service[] = [];

            for await (const row of stream as AsyncIterable<ServiceCsv>) {
                const parser: Service = new ServiceFromCsv(row).map();
                list.push(parser);
            }

            await this.repository.insertBatch(list);
            console.log("Batch inserted!\n");
        } catch (error) {
            throw new InsertBatchError(`Error inserting batch: ${this.filePath} ` + error);
        }
    }
}
