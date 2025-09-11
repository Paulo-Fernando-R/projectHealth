import type { Pool } from "mysql2/promise";
import type { Stablishment } from "../models/stablishment.ts";
import type { ConfigType } from "../types/configType.ts";
import { Connection } from "./connection.ts";
import fs from "fs";

export class StablishmentRepository {
    appConfig: ConfigType;
    connection: Connection;

    columnNames: string;

    constructor(appConfig: ConfigType, connection: Connection) {
        this.appConfig = appConfig;
        this.connection = connection;
        this.columnNames = this.initializeColumnNames();
    }

    async insertBatch(pool: Pool, rows: Stablishment[]) {
        //console.log(rows);

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

        const sql = `INSERT INTO stablishment (${this.columnNames}) VALUES ${placeholders}`;

        try {
            await pool.query("SET FOREIGN_KEY_CHECKS = 0;");
            await pool.query(sql, values);
            // console.log(`✔️ ${rows.length} registros inseridos`);
        } catch (error) {
            console.error("❌ Erro no batch:", error);
        }
    }

    async insertFile(file: string) {

        await this.connection.connect();
        await this.connection.connection?.query("SET FOREIGN_KEY_CHECKS = 0;");

        await this.connection.connection?.query({
            //!TODO change path to param
            sql: `LOAD DATA LOCAL INFILE './files/output/stablishments.csv'
                    INTO TABLE stablishment
                    FIELDS TERMINATED BY ','
                    ENCLOSED BY '"'
                    LINES TERMINATED BY '\n'
                    IGNORE 1 LINES
                    (${this.columnNames});
                    `,
            infileStreamFactory: () => fs.createReadStream("./files/output/stablishments.csv"), //!TODO change path to param
        });
        await this.connection.disconnect();
    }

    initializeColumnNames() {
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
        return columnNames;
    }
}

//  susId, cnes, personType, socialReason, fantasyName,
//                         addressNumber, address, addressComplement, addressDistrict, addressCep,
//                         state, phone, email, cpf, cnpj, lastUpdate,
//                         deactivationCode, url, latitude, longitude, alwaysOpen,
//                         contractWithSus, unitTypeCode, stablishmentTypeCode, cityCode,
//                         legalNatureCode
