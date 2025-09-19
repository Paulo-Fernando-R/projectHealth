import type { LegalNature } from "../models/legalNature.ts";
import type { ConfigType } from "../types/configType.ts";
import type { IConnection } from "./Iconnection.ts";
import { legalNatureHeaders } from "../utils/csvHeaders.ts";
import type { ILegalNatureRepository } from "./IlegalNatureRepository.ts";

export class LegalNatureRepository implements ILegalNatureRepository {
    appConfig: ConfigType;
    connection: IConnection;

    constructor(appConfig: ConfigType, connection: IConnection) {
        this.appConfig = appConfig;
        this.connection = connection;
    }

    async insertBatch(rows: LegalNature[]) {
        this.connection.connect();

        const pool = this.connection.createPool();

        const numColumns = 2;

        const placeholders = rows
            .map(() => `(${Array(numColumns).fill("?").join(", ")})`)
            .join(", ");

        const values = rows.flatMap((r) => [r.natureCode, r.natureDescription]);

        const headers = legalNatureHeaders.slice(1).join(", ");

        const sql = `INSERT INTO legalNature (${headers}) VALUES ${placeholders};`;

        try {
            await pool.query(sql, values);
        } catch (error) {
            throw error;
        } finally {
            await pool.end();
            await this.connection.disconnect();
        }
    }
}
