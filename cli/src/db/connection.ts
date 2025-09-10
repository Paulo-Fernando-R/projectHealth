import mysql from "mysql2/promise";
import { DatabaseConnectionError } from "../errors/customErrors.ts";
import type { IConnection } from "./Iconnection.ts";
export class Connection implements IConnection {
    connection: mysql.Connection | null = null;
    host: string;
    user: string;
    password: string;
    database: string;

    constructor(host: string, user: string, password: string, database: string) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
    }
    public async connect() {
        try {
            this.connection = await mysql.createConnection({
                host: this.host,
                user: this.user,
                password: this.password,
                database: this.database,
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
}
