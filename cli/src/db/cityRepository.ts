import type { City } from "../models/city.ts";
import type { ConfigType } from "../types/configType.ts";
import type { IConnection } from "./Iconnection.ts";
import { cityHeaders } from "../utils/csvHeaders.ts";
import type { ICityRepository } from "./IcityRepository.ts";

export class CityRepository implements ICityRepository {
    appConfig: ConfigType;
    connection: IConnection;
    constructor(appConfig: ConfigType, connection: IConnection) {
        this.appConfig = appConfig;
        this.connection = connection;
    }

    async insertBatch(rows: City[]) {
        this.connection.connect();

        const pool = this.connection.createPool();

        const numColumns = 3;

        const placeholders = rows
            .map(() => {
                return `(${Array(numColumns).fill("?").join(", ")})`;
            })
            .join(", ");

        const values = rows.flatMap((r) => {
            return [r.cityCode, r.cityName, r.state];
        });

        const headers = cityHeaders.slice(1).join(", ");

        const sql = `INSERT INTO city (${headers}) VALUES ${placeholders};`;

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
