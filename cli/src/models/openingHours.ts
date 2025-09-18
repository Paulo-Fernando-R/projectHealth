export interface OpeningHours {
    internalId?: number | null;
    dayCode: number;
    startHour: string;
    endHour: string;
    lastUpdate: Date;
    stablishmentSusId: string;
}
