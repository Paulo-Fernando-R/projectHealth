import { StablishmentServiceFromCsv } from "../mappers/stablishmentServiceFromCsv.ts";
import type { StablishmentService } from "../models/stablishMentService.ts";
import type { StablishmentServiceCSV } from "../models/stablishmentServiceCsv.ts";
import type { ICsvParser } from "../parsers/IcsvParser.ts";
import type { ICsvWriter } from "../parsers/IcsvWriter.ts";

export class WriteStablishmentServicesFileCase {
    csvParser: ICsvParser;
    csvWriter: ICsvWriter;
    inputFile: string;
    constructor(csvParser: ICsvParser, csvWriter: ICsvWriter, inputFile: string) {
        this.csvParser = csvParser;
        this.csvWriter = csvWriter;
        this.inputFile = inputFile;
    }

    async execute() {
        const stream = await this.csvParser.parse(this.inputFile);
        console.log(`Parsing file ${this.inputFile}...`);

        for await (const row of stream as AsyncIterable<StablishmentServiceCSV>) {
            const parser: StablishmentService = new StablishmentServiceFromCsv(row).map();
            const aux = Object.values(parser);
            this.csvWriter.write(aux.toString());
        }

        console.log("File parsed!");
        this.csvWriter.close();
    }
}
