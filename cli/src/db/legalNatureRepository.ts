import type { LegalNature } from "../models/legalNature.ts";
import type { ConfigType } from "../types/configType.ts";
import type { IConnection } from "./Iconnection.ts";
import { legalNatureHeaders } from "../utils/csvHeaders.ts";
import type { ILegalNatureRepository } from "./IlegalNatureRepository.ts";
import type { PoolConnection } from "mysql2/promise";

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
        const conn = await pool.getConnection();

        const numColumns = 2;

        const placeholders = rows
            .map(() => `(${Array(numColumns).fill("?").join(", ")})`)
            .join(", ");

        const values = rows.flatMap((r) => [r.natureCode, r.natureDescription]);

        const headers = legalNatureHeaders.slice(1).join(", ");

        const sql = `INSERT INTO legalNature (${headers}) VALUES ${placeholders};`;

        try {
            await this.switchConstraints(false, conn);
            await conn.query("TRUNCATE TABLE legalNature;");
            await pool.query(sql, values);
        } catch (error) {
            throw error;
        } finally {
            await this.switchConstraints(true, conn);
            conn.release();
            await pool.end();
            await this.connection.disconnect();
        }
    }

    private async switchConstraints(control: boolean, conn: PoolConnection) {
        if (control) {
            await conn.query("SET SQL_SAFE_UPDATES = 1;");
            await conn.query("SET FOREIGN_KEY_CHECKS = 1;");
        } else {
            await conn.query("SET SQL_SAFE_UPDATES = 0;");
            await conn.query("SET FOREIGN_KEY_CHECKS = 0;");
        }
    }
}
