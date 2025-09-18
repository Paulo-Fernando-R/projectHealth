import type { LegalNature } from "../models/legalNature.ts";

export interface ILegalNatureRepository {
    insertBatch(rows: LegalNature[]): Promise<void>;
}
