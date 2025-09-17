import type { Pool } from "mysql2/promise";
import type { UnitType } from "../models/unitType.ts";

export interface IUnitTypeRepository {
  insertBatch(rows: UnitType[], table?: string): Promise<void>
}
