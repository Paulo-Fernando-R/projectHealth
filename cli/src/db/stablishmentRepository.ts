import type { IStablishmentRepository } from "./IstablishmentRepository.ts";
import type { Stablishment } from "../models/stablishment.ts";
import { stablishmentHeaders } from "../utils/csvHeaders.ts";
import type { ConfigType } from "../types/configType.ts";
import type { IConnection } from "./Iconnection.ts";
import type { Pool } from "mysql2/promise";
import fs from "fs";
import { InsertFileError } from "../errors/customErrors.ts";

export class StablishmentRepository implements IStablishmentRepository {
    appConfig: ConfigType;
    connection: IConnection;

    constructor(appConfig: ConfigType, connection: IConnection) {
        this.appConfig = appConfig;
        this.connection = connection;
    }

    async insertBatch(pool: Pool, rows: Stablishment[]) {
        //console.log(rows);
        this.connection.connect();

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

        const sql = `INSERT INTO stablishment (${stablishmentHeaders.join(
            ", "
        )}) VALUES ${placeholders}`;

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
        //this.connection.connection?.query("TRUNCATE TABLE stablishment;");

        try {
            await this.connection.connection?.query("SET FOREIGN_KEY_CHECKS = 0;");
            await this.connection.connection?.query({
                sql: `LOAD DATA LOCAL INFILE '${file}'
                    INTO TABLE stablishment
                    FIELDS TERMINATED BY ','
                    ENCLOSED BY '"'
                    LINES TERMINATED BY '\n'
                    IGNORE 1 LINES
                    (${stablishmentHeaders.join(", ")});
                    `,
                infileStreamFactory: () => fs.createReadStream(file),
            });
            await this.connection.connection?.query("SET FOREIGN_KEY_CHECKS = 1;");
            await this.connection.disconnect();
        } catch (error) {
            await this.connection.disconnect();
            throw new InsertFileError(`Error inserting file: ${file} ` + error);
        }
    }
}
