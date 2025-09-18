import type { Service } from "../models/service.ts";
import type { ConfigType } from "../types/configType.ts";
import { serviceHeaders } from "../utils/csvHeaders.ts";
import type { IConnection } from "./Iconnection.ts";
import type { IServiceRepository } from "./IserviceRepository.ts";

export class ServiceRepository implements IServiceRepository {
    appConfig: ConfigType;
    connection: IConnection;
    constructor(appConfig: ConfigType, connection: IConnection) {
        this.appConfig = appConfig;
        this.connection = connection;
    }

    async insertBatch(rows: Service[]) {
        this.connection.connect();

        const pool = this.connection.createPool();

        const numColumns = 2;

        const placeholders = rows
            .map(() => `(${Array(numColumns).fill("?").join(", ")})`)
            .join(", ");

        const values = rows.flatMap((r) => [r.serviceCode, r.serviceDescription]);

        const headers = serviceHeaders.slice(1).join(", ");

        const sql = `INSERT INTO service (${headers}) VALUES ${placeholders};`;

        try {
            await pool.query(sql, values);

            await pool.end();
            this.connection.disconnect();
        } catch (error) {
            await pool.end();
            this.connection.disconnect();
            throw error;
        }
    }
}
