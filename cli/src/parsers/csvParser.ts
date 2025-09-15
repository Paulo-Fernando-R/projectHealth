import { ParsingError } from "../errors/customErrors.ts";
import type { ICsvParser } from "./IcsvParser.ts";
import csvParser from "csv-parser";
import fs from "fs";

export class CsvParser implements ICsvParser {
    public async parse(filePath: string, separator: string = ";") {
        try {
            const stream = fs
                .createReadStream(filePath /*"./files/unzip/tbEstabelecimento202507.csv"*/)
                .pipe(csvParser({ separator: separator }));

            return stream;
        } catch (error) {
            throw new ParsingError("Error parsing file: " + filePath + error);
        }
    }
}
