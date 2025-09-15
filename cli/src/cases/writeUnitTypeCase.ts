import { UnitTypeFromCsv } from "../mappers/unitTypeFromCsv.ts";
import type { UnitType } from "../models/unitType.ts";
import type { UnitTypeCsv } from "../models/unitTypeCsv.ts";
import type { ICsvParser } from "../parsers/IcsvParser.ts";
import type { ICsvWriter } from "../parsers/IcsvWriter.ts";

export class WriteUnitTypeCase {
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

        for await (const row of stream as AsyncIterable<UnitTypeCsv>) {
            const parser: UnitType = new UnitTypeFromCsv(row).map();
            const aux = Object.values(parser);
            this.csvWriter.write(aux.toString());
        }

        console.log("File parsed!");
        this.csvWriter.close();
    }
}
