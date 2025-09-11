import type { ConfigType } from "../types/configType.ts";

export interface IConnection {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    appConfig: ConfigType;
}
