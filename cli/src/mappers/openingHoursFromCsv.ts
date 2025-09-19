import type { OpeningHours } from "../models/openingHours.ts";
import type { OpeningHoursCsv } from "../models/openingHoursCsv.ts";
import { dateFormat } from "../utils/dateFormat.ts";

export class OpeningHoursFromCsv {
    csv: OpeningHoursCsv;

    constructor(csv: OpeningHoursCsv) {
        this.csv = csv;
    }
    map() {
        const openingHours: OpeningHours = {
            internalId: null,
            dayCode: this.csv.CO_DIA_SEMANA,
            startHour: this.csv.HR_INICIO_ATENDIMENTO,
            endHour: this.csv.HR_FIM_ATENDIMENTO,
            lastUpdate: dateFormat.normalizeDate(this.csv["TO_CHAR(DT_ATUALIZACAO, 'DD/MM/YYYY')"]),
            stablishmentSusId: this.csv.CO_UNIDADE,
        };

        return openingHours;
    }
    //!TODO Move normalizeDate to utils
    normalizeDate(date: string) {
        if (!date) {
            return new Date(Date.now());
        }
        const [day, month, year] = date.split("/").map(Number);
        if (!day || !month || !year) {
            return new Date(Date.now());
        }
        return new Date(year, month - 1, day);
    }
}
