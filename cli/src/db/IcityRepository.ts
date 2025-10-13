import type { City } from "../models/city.ts";

export interface ICityRepository {
    insertBatch(rows: City[], truncate?: boolean): Promise<void>;
}