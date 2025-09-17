import type { CityCsv } from "../models/cityCsv.ts";

export class CityFromCsv {
  csv:CityCsv
  constructor(csv: CityCsv) {
    this.csv = csv;
  }

  map(){
    return {
      internalId: null,
      cityCode: this.csv.CO_MUNICIPIO,
      cityName: this.csv.NO_MUNICIPIO,
      state: this.csv.CO_SIGLA_ESTADO,
    }
  }
}