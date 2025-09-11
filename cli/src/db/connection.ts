import mysql, { type Pool } from "mysql2/promise";
import { DatabaseConnectionError } from "../errors/customErrors.ts";
import type { IConnection } from "./Iconnection.ts";
import type { ConfigType } from "../types/configType.ts";

export class Connection implements IConnection {
    connection: mysql.Connection | null = null;
    appConfig: ConfigType;
    pool: Pool | null = null;

    constructor(appConfig: ConfigType) {
        this.appConfig = appConfig;
    }
    public async connect() {
        try {
            this.connection = await mysql.createConnection({
                host: this.appConfig.host,
                user: this.appConfig.user,
                password: this.appConfig.password,
                database: this.appConfig.database,
            });
        } catch (error) {
            throw new DatabaseConnectionError("Failed to connect to the database: " + error);
        } finally {
        }
    }

    public async disconnect() {
        if (this.connection) {
            await this.connection.end();
            this.connection = null;
        }
    }

    public createPool() {
        const pool: Pool = mysql.createPool({
            host: this.appConfig.host,
            user: this.appConfig.user,
            password: this.appConfig.password,
            database: this.appConfig.database,
            waitForConnections: true,
            connectionLimit: 100,
        });

        this.pool = pool;
        return pool;
    }
}
