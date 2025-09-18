import type { StablishmentServiceCSV } from "../models/stablishmentServiceCsv.ts";

export class StablishmentServiceFromCsv {
    csv: StablishmentServiceCSV;
    constructor(csv: StablishmentServiceCSV) {
        this.csv = csv;
    }

    map() {
        return {
            stablishmentSusId: this.csv.CO_UNIDADE,
            serviceCode: this.csv.CO_SERVICO,
        };
    }
}
