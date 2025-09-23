import type { UnitType } from "../models/unitType.ts";
import type { ConfigType } from "../types/configType.ts";
import type { IConnection } from "./Iconnection.ts";
import { unitTypeHeaders } from "../utils/csvHeaders.ts";
import type { IUnitTypeRepository } from "./IunitTypeRepository.ts";
import { InsertBatchError } from "../errors/customErrors.ts";
import type { PoolConnection } from "mysql2/promise";

export class UnitTypeRepository implements IUnitTypeRepository {
    appConfig: ConfigType;
    connection: IConnection;

    constructor(appConfig: ConfigType, connection: IConnection) {
        this.appConfig = appConfig;
        this.connection = connection;
        this.connection.createPool();
    }

    async insertBatch(rows: UnitType[], table = "unitType") {
        await this.connection.connect();
        this.connection.createPool();
        const conn = await this.connection.pool!.getConnection();

        const numColumns = 2;
        const placeholders = rows
            .map(() => `(${Array(numColumns).fill("?").join(", ")})`)
            .join(", ");

        const values = rows.flatMap((r) => [r.typeCode, r.typeDescription]);
        const headers = unitTypeHeaders.slice(1).join(", ");
        const sql = `INSERT INTO ${table} (${headers}) VALUES ${placeholders};`;

        try {
            
            await this.switchConstraints(false, conn);
            await conn.query(`TRUNCATE TABLE ${table};`);
            await this.connection.pool!.query(sql, values);

        } catch (error) {
            throw error;
        } finally {
            await this.switchConstraints(true, conn);
            conn.release();
            await this.connection.pool!.end();
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
