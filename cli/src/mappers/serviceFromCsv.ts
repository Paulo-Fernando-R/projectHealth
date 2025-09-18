import type { ServiceCsv } from "../models/serviceCsv.ts";

export class ServiceFromCsv{
    csv:ServiceCsv
    constructor(csv: ServiceCsv) {
        this.csv = csv;
    }

    map(){
        return {
            internalId: null,
            serviceCode: this.csv.CO_SERVICO_ESPECIALIZADO,
            serviceDescription: this.csv.DS_SERVICO_ESPECIALIZADO,
        }
    }
}