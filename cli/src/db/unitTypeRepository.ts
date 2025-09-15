import type { UnitType } from "../models/unitType.ts";
import type { ConfigType } from "../types/configType.ts";
import type { IConnection } from "./Iconnection.ts";
import { unitTypeHeaders } from "../utils/csvHeaders.ts";
import type { IUnitTypeRepository } from "./IunitTypeRepository.ts";

export class UnitTypeRepository implements IUnitTypeRepository {
    appConfig: ConfigType;
    connection: IConnection;

    constructor(appConfig: ConfigType, connection: IConnection) {
        this.appConfig = appConfig;
        this.connection = connection;
        this.connection.createPool();
    }

    async insertBatch(rows: UnitType[]) {
        this.connection.connect();
        const pool = this.connection.createPool();

        const numColumns = 2;
        const placeholders = rows
            .map(() => `(${Array(numColumns).fill("?").join(", ")})`)
            .join(", ");

        const values = rows.flatMap((r) => [r.typeCode, r.typeDescription]);
        const headers = unitTypeHeaders.splice(1, 2).join(", ");
        const sql = `INSERT INTO unitType (${headers}) VALUES ${placeholders};`;

        console.log(sql, values, placeholders, headers, rows.length);
        try {
            await pool.query(sql, values);

            await pool.end();
        } catch (error) {
            throw error;
        }
    }
}
