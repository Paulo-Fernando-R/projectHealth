import type { IStablishmentRepository } from "./IstablishmentRepository.ts";
import type { Stablishment } from "../models/stablishment.ts";
import { stablishmentHeaders } from "../utils/csvHeaders.ts";
import type { ConfigType } from "../types/configType.ts";
import type { IConnection } from "./Iconnection.ts";
import type { Connection, Pool } from "mysql2/promise";
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
        try {
            await this.connection.connect();
            const sql = "SELECT COUNT(internalId) AS total FROM stablishment;";
            const [rows] = await this.connection.connection!.execute<CountRowType[]>(sql);

            const total = rows[0]?.total;

            if (total && total > 0) return false;
            return true;
        } catch (error) {
            throw new QueryError(`Error verifying table: ${error}`);
        } finally {
            await this.connection.disconnect();
        }
    }

    private async switchConstraints(control: boolean) {
        if (control) {
            await this.connection.connection?.query("SET SQL_SAFE_UPDATES = 1;");
            await this.connection.connection?.query("SET FOREIGN_KEY_CHECKS = 1;");
        } else {
            await this.connection.connection?.query("SET SQL_SAFE_UPDATES = 0;");
            await this.connection.connection?.query("SET FOREIGN_KEY_CHECKS = 0;");
        }
    }

    private async merge(newTable: string, file: string) {
        const mergeStr = `INSERT INTO stablishment (
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
            FROM ${newTable} AS t
            LEFT JOIN stablishment AS d
            ON d.susId = t.susId AND d.cnes = t.cnes
            WHERE d.lastUpdate IS NULL OR t.lastUpdate > d.lastUpdate
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
            await this.connection.connection?.query(mergeStr);
            await this.connection.connection?.query(`DROP TABLE ${newTable};`);
        } catch (error) {
            throw new MergeError(`Error merging file: ${file} ` + error);
        }
    }

    async updateTable(file: string) {
        await this.connection.connect();
        const newTable = "tempStablishment";
        const createTable = `CREATE TABLE ${newTable} LIKE stablishment;`;

        try {
            await this.switchConstraints(false);
            await this.connection.connection?.query(`drop table if exists ${newTable};`);

            await this.connection.connection?.query(createTable);
            await this.insertFile(file, newTable);

            await this.merge(newTable, file);
        } catch (error) {
            if (error instanceof MergeError) throw error;
            throw new InsertFileError(`Error inserting file: ${file} ` + error);
        } finally {
            await this.switchConstraints(true);
            await this.connection.disconnect();
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
        } catch (error) {
            throw new InsertFileError(`Error inserting file: ${file} ` + error);
        } finally {
            await this.connection.disconnect();
        }
    }
}
