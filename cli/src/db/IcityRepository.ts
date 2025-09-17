import type { City } from "../models/city.ts";

export interface ICityRepository {
    insertBatch(rows: City[]): Promise<void>;
}