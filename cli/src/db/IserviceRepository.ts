import type { Service } from "../models/service.ts";

export interface IServiceRepository {
    insertBatch(rows: Service[]): Promise<void>;
}