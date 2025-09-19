import type { Stablishment } from "../models/stablishment.ts";
import type { ConfigType } from "../types/configType.ts";
import type { IConnection } from "./Iconnection.ts";
import type { Pool } from "mysql2/promise";

export interface IStablishmentRepository {
    appConfig: ConfigType;
    connection: IConnection;

    insertBatch(pool: Pool, rows: Stablishment[]): Promise<void>;
    insertFile(file: string, table?: string): Promise<void>;
    verifyTableEmpty(): Promise<boolean>
    updateTable(file: string): Promise<void>;
}
