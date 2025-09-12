import csvParser from "csv-parser";
import fs from "fs";
import type { StablishmentCSV } from "../models/stablishmentCsv.ts";
import { StablismentFromCsv } from "../mappers/stablishmentFromCsv.ts";
import type { Stablishment } from "../models/stablishment.ts";
import { createObjectCsvWriter } from "csv-writer";
import type { CsvWriter } from "csv-writer/src/lib/csv-writer.ts";
import type { ObjectMap } from "csv-writer/src/lib/lang/object.ts";
import { Connection } from "../db/connection.ts";
import { appConfig } from "../app.config.ts";
import mysql, { type Pool } from "mysql2/promise";
import { StablishmentRepository } from "../db/stablishmentRepository.ts";
import { format } from "@fast-csv/format";
export class CsvParser {
    csvWriter: CsvWriter<ObjectMap<any>>;

    constructor() {
        this.csvWriter = this.csvWriterInit();
    }
    public async parse() {
        const buffer: Stablishment[] = [];

        const connection = new Connection(appConfig);
        const pool = connection.createPool();
        const repo = new StablishmentRepository(appConfig, connection);
        const writer = this.csvW();

        const stream = fs
            .createReadStream("./files/unzip/tbEstabelecimento202507.csv")
            .pipe(csvParser({ separator: ";" }));

        console.log("Parsing file...");
        const nList = [];
        for await (const row of stream as AsyncIterable<StablishmentCSV>) {
            const parser: Stablishment = new StablismentFromCsv(row).map();

            buffer.push(parser);
            const aux = Object.values(parser);
           writer.write(aux.toString() + "\n");
            // console.log(parser.lastUpdate, row["TO_CHAR(DT_ATUALIZACAO,'DD/MM/YYYY')"]);

            if (buffer.length > 9000) {
                // await this.csvWriter.writeRecords(buffer);
                // await this.insertBatch(pool, buffer);
                // await repo.insertBatch(pool, buffer);
                // writer.write(JSON.stringify(buffer));

               
                buffer.length = 0;
            }

            if (buffer.length > 0) {
                // await this.csvWriter.writeRecords(buffer);
                //await this.insertBatch(pool, buffer);
                // await repo.insertBatch(pool, buffer);
                // writer.write(JSON.stringify(buffer));
             
                buffer.length = 0;
            }
        }
        writer.end();
        console.log("File parsed!");
    }

    async writeDb() {
        const connection = new Connection(appConfig);
        await connection.connect();
        await connection.connection?.query("SET FOREIGN_KEY_CHECKS = 0;");
        await connection.connection?.query({
            sql: `LOAD DATA LOCAL INFILE './files/output/stablishments.csv'
                INTO TABLE stablishment
                FIELDS TERMINATED BY ','
                ENCLOSED BY '"'
                LINES TERMINATED BY '\n'
                IGNORE 1 LINES
                ( 
  susId, cnes, personType, socialReason, fantasyName,
        addressNumber, address, addressComplement, addressDistrict, addressCep,
        state, phone, email, cpf, cnpj, lastUpdate,
        deactivationCode, url, latitude, longitude, alwaysOpen,
        contractWithSus, unitTypeCode, stablishmentTypeCode, cityCode,
        legalNatureCode);
                `,
            infileStreamFactory: () => fs.createReadStream("./files/output/stablishments.csv"),
        });
        await connection.disconnect();
    }

    csvWriterInit() {
        const outputFile = "./files/output/stablishments.csv";
        const headers = [
            { id: "internalId", title: "internalId" },
            { id: "susId", title: "susId" },
            { id: "cnes", title: "cnes" },
            { id: "personType", title: "personType" },
            { id: "socialReason", title: "socialReason" },
            { id: "fantasyName", title: "fantasyName" },
            { id: "addressNumber", title: "addressNumber" },
            { id: "address", title: "address" },
            { id: "addressComplement", title: "addressComplement" },
            { id: "addressDistrict", title: "addressDistrict" },
            { id: "addressCep", title: "addressCep" },
            { id: "state", title: "state" },
            { id: "phone", title: "phone" },
            { id: "email", title: "email" },
            { id: "cnpj", title: "cnpj" },
            { id: "cpf", title: "cpf" },
            { id: "lastUpdate", title: "lastUpdate" },
            { id: "deactivationCode", title: "deactivationCode" },
            { id: "url", title: "url" },
            { id: "latitude", title: "latitude" },
            { id: "longitude", title: "longitude" },
            { id: "alwaysOpen", title: "alwaysOpen" },
            { id: "contractWithSus", title: "contractWithSus" },
            { id: "unitTypeCode", title: "unitTypeCode" },
            { id: "stablishmentTypeCode", title: "stablishmentTypeCode" },
            { id: "cityCode", title: "cityCode" },
            { id: "legalNatureCode", title: "legalNatureCode" },
        ];
        const aux: Array<keyof Stablishment> = [];
        const writter = createObjectCsvWriter({
            path: outputFile,
            header: headers,
            fieldDelimiter: ",",
            recordDelimiter: "\n",
            encoding: "utf-8",
            append: false,
        });

        return writter;
    }

    csvW() {
        const outputFile = fs.createWriteStream("./files/output/stablishments.csv");

        const headers = [
            "internalId",
            "susId",
            "cnes",
            "personType",
            "socialReason",
            "fantasyName",
            "addressNumber",
            "address",
            "addressComplement",
            "addressDistrict",
            "addressCep",
            "state",
            "phone",
            "email",
            "cnpj",
            "cpf",
            "lastUpdate",
            "deactivationCode",
            "url",
            "latitude",
            "longitude",
            "alwaysOpen",
            "contractWithSus",
            "unitTypeCode",
            "stablishmentTypeCode",
            "cityCode",
            "legalNatureCode",
        ];

        const csvStream = format({
            headers: headers,
        });

        csvStream.pipe(outputFile).on("end", () => console.log("Done!"));

        //  return csvStream;

        const writerStream = fs.createWriteStream("./files/output/stablishments.csv");

        writerStream.write(headers.join(",") + "\n");

        return writerStream;
    }
}
