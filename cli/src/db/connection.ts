import mysql from "mysql2/promise";
import { appConfig } from "../app.config.ts";
import { DatabaseConnectionError } from "../errors/customErrors.ts";
export class Connection {
    host: string;
    user: string;
    password: string;
    database: string;

    constructor() {
        this.host = appConfig.host;
        this.user = appConfig.user;
        this.password = appConfig.password;
        this.database = appConfig.database;
    }
    public async connect() {
        try {
            const connection = await mysql.createConnection({
                host: this.host,
                user: this.user,
                password: this.password,
                database: this.database,
            });
            return connection;
        } catch (error) {
            throw new DatabaseConnectionError("Failed to connect to the database: " + error);
        }
    }
}
