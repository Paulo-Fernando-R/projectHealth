import type { ConfigType } from "../types/configType.ts";
import mysql, { type Pool } from "mysql2/promise";

export interface IConnection {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    appConfig: ConfigType;
    connection: mysql.Connection | null;
    pool: mysql.Pool | null;
    createPool(): mysql.Pool
}
