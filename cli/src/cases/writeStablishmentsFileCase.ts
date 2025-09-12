import { StablismentFromCsv } from "../mappers/stablishmentFromCsv.ts";
import type { Stablishment } from "../models/stablishment.ts";
import type { StablishmentCSV } from "../models/stablishmentCsv.ts";
import { CsvParser } from "../parsers/csvParser.ts";
import { CsvWriter } from "../parsers/csvWriter.ts";
import type { ICsvParser } from "../parsers/IcsvParser.ts";
import type { ICsvWriter } from "../parsers/IcsvWriter.ts";

export class WriteStablishmentsFileCase {
    csvParser: ICsvParser;
    csvWriter: ICsvWriter;
    inputFile = "./files/unzip/tbEstabelecimento202507.csv";

    constructor(csvParser: ICsvParser, csvWriter: ICsvWriter, inputFile: string) {
        this.csvParser = csvParser;
        this.csvWriter = csvWriter;
        this.inputFile = inputFile;
    }
    async execute() {
        const stream = await this.csvParser.parse(this.inputFile);

        for await (const row of stream as AsyncIterable<StablishmentCSV>) {
            const parser: Stablishment = new StablismentFromCsv(row).map();
            const aux = Object.values(parser);
            this.csvWriter.write(aux.toString());
        }

        this.csvWriter.close();
        console.log("File parsed!");
    }
}
