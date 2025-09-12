import csvParser from "csv-parser";
import fs from "fs";
import { Connection } from "../db/connection.ts";
import { appConfig } from "../app.config.ts";
import { StablishmentRepository } from "../db/stablishmentRepository.ts";
import type { ICsvParser } from "./IcsvParser.ts";

export class CsvParser implements ICsvParser {
    public async parse(filePath: string) {
        const stream = fs
            .createReadStream(filePath /*"./files/unzip/tbEstabelecimento202507.csv"*/)
            .pipe(csvParser({ separator: ";" }));

        return stream;
    }

    async writeDb() {
        const repo = new StablishmentRepository(appConfig, new Connection(appConfig));

        await repo.insertFile("./files/output/stablishments.csv");
    }
}

/*

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

*/

/*
 headers = [
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

*/
