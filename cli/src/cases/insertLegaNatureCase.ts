import type { ILegalNatureRepository } from "../db/IlegalNatureRepository.ts";
import { InsertBatchError } from "../errors/customErrors.ts";
import { LegalNatureFromCsv } from "../mappers/legalNatureFromCsv.ts";
import type { LegalNature } from "../models/legalNature.ts";
import type { LegalNatureCsv } from "../models/legalNatureCsv.ts";
import type { ICsvParser } from "../parsers/IcsvParser.ts";

export class InsertLegalNatureCase {
    repository: ILegalNatureRepository;
    csvParser: ICsvParser;
    filePath: string;
    constructor(repository: ILegalNatureRepository, filePath: string, csvParser: ICsvParser) {
        this.repository = repository;
        this.filePath = filePath;
        this.csvParser = csvParser;
    }

    async execute() {
        try {
            console.log(`Inserting batch: ${this.filePath}...`);
            const stream = await this.csvParser.parse(this.filePath, ";");
            const list: LegalNature[] = [];

            for await (const row of stream as AsyncIterable<LegalNatureCsv>) {
                const parser: LegalNature = new LegalNatureFromCsv(row).map();
                list.push(parser);
            }

            await this.repository.insertBatch(list);
            console.log("Batch inserted!");
        } catch (error) {
            throw new InsertBatchError(`Error inserting batch: ${this.filePath} ` + error);
        }
    }
}
