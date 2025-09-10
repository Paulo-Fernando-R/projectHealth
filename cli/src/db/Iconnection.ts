export interface IConnection {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    host: string;
    user: string;
    password: string;
    database: string;
}
