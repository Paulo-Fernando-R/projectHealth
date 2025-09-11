import csvParser from "csv-parser";
import fs from "fs";
import type { StablishmentCSV } from "../models/stablishmentCsv.ts";
import { StablismentFromCsv } from "../mappers/stablishmentFromCsv.ts";
import type { Stablishment } from "../models/stablishment.ts";
export class CsvParser {
    public async parse() {
        const buffer: Stablishment[] = [];

        const stream = fs
            .createReadStream("./files/unzip/tbEstabelecimento202507.csv")
            .pipe(csvParser({ separator: ";" }));

        for await (const row of stream as AsyncIterable<StablishmentCSV>) {
            const parser: Stablishment = new StablismentFromCsv(row).map();

            buffer.push(parser);
        }

        console.log("buffer: ", buffer);
    }
}
