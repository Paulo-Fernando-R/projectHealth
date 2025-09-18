import type { ICsvParser } from "../parsers/IcsvParser.ts";
import type { ICsvWriter } from "../parsers/IcsvWriter.ts";
import { OpeningHoursFromCsv } from "../mappers/openingHoursFromCsv.ts";
import type { OpeningHours } from "../models/openingHours.ts";
import type { OpeningHoursCsv } from "../models/openingHoursCsv.ts";

export class WriteOpeningHoursFileCase {
    csvParser: ICsvParser;
    csvWriter: ICsvWriter;
    inputFile = "./files/unzip/tbEstabelecimento202507.csv";

    constructor(csvParser: ICsvParser, csvWriter: ICsvWriter, inputFile: string) {
        this.csvParser = csvParser;
        this.csvWriter = csvWriter;
        this.inputFile = inputFile;
    }

    async execute(){
        const stream = await this.csvParser.parse(this.inputFile);
        console.log(`Parsing file ${this.inputFile}...`);

        for await (const row of stream as AsyncIterable<OpeningHoursCsv>) {
            const parser: OpeningHours = new OpeningHoursFromCsv(row).map();
            const aux = Object.values(parser);
            this.csvWriter.write(aux.toString());
        }

        console.log("File parsed!");
        this.csvWriter.close();
    }
}
