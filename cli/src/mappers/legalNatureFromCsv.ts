import type { LegalNatureCsv } from "../models/legalNatureCsv.ts";

export class LegalNatureFromCsv{
    csv:LegalNatureCsv
    constructor(csv: LegalNatureCsv) {
        this.csv = csv;
    }

    map(){
        return {
            internalId: null,
            natureCode: this.csv.CO_NATUREZA_JUR,
            natureDescription: this.csv.DS_NATUREZA_JUR,
        }
    }
}