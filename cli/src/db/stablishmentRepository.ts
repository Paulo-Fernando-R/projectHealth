import type { IStablishmentRepository } from "./IstablishmentRepository.ts";
import type { Stablishment } from "../models/stablishment.ts";
import { stablishmentHeaders } from "../utils/csvHeaders.ts";
import type { ConfigType } from "../types/configType.ts";
import type { IConnection } from "./Iconnection.ts";
import type { Pool } from "mysql2/promise";
import fs from "fs";
import { InsertFileError, MergeError, QueryError } from "../errors/customErrors.ts";
import type { CountRowType } from "../types/countRowType.ts";

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

    async verifyTableEmpty() {
        await this.connection.connect();

        try {
            await this.connection.connect();
            const sql = "SELECT COUNT(internalId) AS total FROM stablishment;";
            const [rows] = await this.connection.connection!.execute<CountRowType[]>(sql);

            await this.connection.disconnect();

            const total = rows[0]?.total;

            if (total && total > 0) return false;
            return true;
        } catch (error) {
            await this.connection.disconnect();
            throw new QueryError(`Error verifying table: ${error}`);
        }
    }

    async updateTable(file: string) {
        await this.connection.connect();
        const newTable = "tempStablishment";
        const createTable = `CREATE TABLE ${newTable} LIKE stablishment;`;

        const merge = `INSERT INTO stablishment (
                susId, cnes, personType, socialReason, fantasyName, 
                addressNumber, address, addressComplement, addressDistrict, addressCep, 
                state, phone, email, cpf, cnpj, lastUpdate, deactivationCode, url, 
                latitude, longitude, alwaysOpen, contractWithSus, 
                unitTypeCode, stablishmentTypeCode, cityCode, legalNatureCode
            )
            SELECT
                susId, cnes, personType, socialReason, fantasyName, 
                addressNumber, address, addressComplement, addressDistrict, addressCep, 
                state, phone, email, cpf, cnpj, lastUpdate, deactivationCode, url, 
                latitude, longitude, alwaysOpen, contractWithSus, 
                unitTypeCode, stablishmentTypeCode, cityCode, legalNatureCode
            FROM stablishment_stage
            ON DUPLICATE KEY UPDATE
                personType           = VALUES(personType),
                socialReason         = VALUES(socialReason),
                fantasyName          = VALUES(fantasyName),
                addressNumber        = VALUES(addressNumber),
                address              = VALUES(address),
                addressComplement    = VALUES(addressComplement),
                addressDistrict      = VALUES(addressDistrict),
                addressCep           = VALUES(addressCep),
                state                = VALUES(state),
                phone                = VALUES(phone),
                email                = VALUES(email),
                cpf                  = VALUES(cpf),
                cnpj                 = VALUES(cnpj),
                lastUpdate           = VALUES(lastUpdate),
                deactivationCode     = VALUES(deactivationCode),
                url                  = VALUES(url),
                latitude             = VALUES(latitude),
                longitude            = VALUES(longitude),
                alwaysOpen           = VALUES(alwaysOpen),
                contractWithSus      = VALUES(contractWithSus),
                unitTypeCode         = VALUES(unitTypeCode),
                stablishmentTypeCode = VALUES(stablishmentTypeCode),
                cityCode             = VALUES(cityCode),
                legalNatureCode      = VALUES(legalNatureCode);
            `;
        try {
            await this.connection.connection?.query("SET SQL_SAFE_UPDATES = 0;");
            await this.connection.connection?.query(`drop table if exists ${newTable};`);

            await this.connection.connection?.query(createTable);
            await this.insertFile(file, newTable);
        } catch (error) {
            await this.connection.disconnect();
            throw new InsertFileError(`Error inserting file: ${file} ` + error);
        }

        try {
            await this.connection.connection?.query(merge);

            await this.connection.connection?.query(`DROP TABLE ${newTable};`);
            await this.connection.connection?.query("SET SQL_SAFE_UPDATES = 1;");
            await this.connection.disconnect();
        } catch (error) {
            await this.connection.disconnect();
            throw new MergeError(`Error merging file: ${file} ` + error);
        }
    }

    async insertFile(file: string, table = "stablishment") {
        await this.connection.connect();
        //this.connection.connection?.query("TRUNCATE TABLE stablishment;");

        try {
            await this.connection.connection?.query("SET FOREIGN_KEY_CHECKS = 0;");
            await this.connection.connection?.query({
                sql: `LOAD DATA LOCAL INFILE '${file}'
                    INTO TABLE ${table}
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
