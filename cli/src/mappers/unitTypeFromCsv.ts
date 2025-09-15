import type { UnitTypeCsv } from "../models/unitTypeCsv.ts";

export class UnitTypeFromCsv {
    csv: UnitTypeCsv;

    constructor(csv: UnitTypeCsv) {
        this.csv = csv;
    }

    map() {
        return {
            internalId: null,
            code: this.csv.CO_TIPO_UNIDADE || this.csv.CO_TIPO_ESTABELECIMENTO,
            description: this.csv.DS_TIPO_UNIDADE || this.csv.DS_TIPO_ESTABELECIMENTO,
        };
    }
}
