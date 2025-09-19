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
            await this.switchConstraints(false);
            await pool.query("TRUNCATE TABLE service;");
            await pool.query(sql, values);
        } catch (error) {
            throw error;
        } finally {
            await this.switchConstraints(true);
            await pool.end();
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
}
