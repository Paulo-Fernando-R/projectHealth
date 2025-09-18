export interface OpeningHoursCsv {
    CO_DIA_SEMANA: number;
    HR_INICIO_ATENDIMENTO: string;
    HR_FIM_ATENDIMENTO: string;
    "TO_CHAR(DT_ATUALIZACAO, 'DD/MM/YYYY')": string;
    CO_UNIDADE: string;
}

/*

internalId?: number | null;
    dayCode: number;
    startHour: string;
    endHour: string;
    lastUpdate: Date;
    stablishmentSusId: string;
*/
