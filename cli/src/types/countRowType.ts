import type { RowDataPacket } from "mysql2/promise";

export type CountRowType = { total: number } & RowDataPacket;
