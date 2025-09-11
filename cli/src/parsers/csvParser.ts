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
export class CsvParser {
    csvWriter: CsvWriter<ObjectMap<any>>;

    constructor() {
        this.csvWriter = this.csvWriterInit();
    }
    public async parse() {
        const buffer: Stablishment[] = [];
        const pool: Pool = mysql.createPool({
            host: appConfig.host,
            user: appConfig.user,
            password: appConfig.password,
            database: appConfig.database,
            waitForConnections: true,
            connectionLimit: 100,
        });

        const stream = fs
            .createReadStream("./files/unzip/tbEstabelecimento202507.csv")
            .pipe(csvParser({ separator: ";" }));

        console.log("Parsing file...");
        for await (const row of stream as AsyncIterable<StablishmentCSV>) {
            const parser: Stablishment = new StablismentFromCsv(row).map();

            buffer.push(parser);
            console.log(parser.lastUpdate, row["TO_CHAR(DT_ATUALIZACAO,'DD/MM/YYYY')"]);

            if (buffer.length > 9000) {
                // await this.csvWriter.writeRecords(buffer);
                await this.insertBatch(pool, buffer);
                buffer.length = 0;
                break;
            }

            if (buffer.length > 0) {
                // await this.csvWriter.writeRecords(buffer);
                await this.insertBatch(pool, buffer);
                buffer.length = 0;
            }
        }
        console.log("File parsed!");
    }

    async insertBatch(pool: Pool, rows: Stablishment[]) {
        //console.log(rows);

        const columnNames = [
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
            "cpf",
            "cnpj",
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
        ].join(", ");

        const numColumns = 26;
        const placeholders = rows
            .map(() => `(${Array(numColumns).fill("?").join(", ")})`)
            .join(", ");

        const values = rows.flatMap((r) => [
            r.susId,
            r.cnes,
            r.personType,
            r.socialReason,
            r.fantasyName,
            r.addressNumber,
            r.address,
            r.addressComplement,
            r.addressDistrict,
            r.addressCep,
            r.state,
            r.phone,
            r.email,
            r.cpf,
            r.cnpj,
            r.lastUpdate,
            r.deactivationCode,
            r.url,
            r.latitude,
            r.longitude,
            r.alwaysOpen,
            r.contractWithSus,
            r.unitTypeCode,
            r.stablishmentTypeCode,
            r.cityCode,
            r.legalNatureCode,
        ]);

        const sql = `INSERT INTO stablishment (${columnNames}) VALUES ${placeholders}`;

        try {
            await pool.query("SET FOREIGN_KEY_CHECKS = 0;");
            await pool.query(sql, values);
            // console.log(`✔️ ${rows.length} registros inseridos`);
        } catch (error) {
            console.error("❌ Erro no batch:", error);
        }
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
}
