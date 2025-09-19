import type { UnitType } from "../models/unitType.ts";
import type { ConfigType } from "../types/configType.ts";
import type { IConnection } from "./Iconnection.ts";
import { unitTypeHeaders } from "../utils/csvHeaders.ts";
import type { IUnitTypeRepository } from "./IunitTypeRepository.ts";
import { InsertBatchError } from "../errors/customErrors.ts";

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
        const pool = this.connection.createPool();

        const numColumns = 2;
        const placeholders = rows
            .map(() => `(${Array(numColumns).fill("?").join(", ")})`)
            .join(", ");

        const values = rows.flatMap((r) => [r.typeCode, r.typeDescription]);
        const headers = unitTypeHeaders.slice(1).join(", ");
        const sql = `INSERT INTO ${table} (${headers}) VALUES ${placeholders};`;

        try {
            await pool.query(sql, values);

            await pool.end();
        } catch (error) {
            await pool.end();

            throw error;
        } finally {
            await pool.end();
            await this.connection.disconnect();
        }
    }
}
