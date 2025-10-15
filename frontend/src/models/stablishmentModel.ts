export default interface StablishmentModel {
    susId: string;
    fantasyName: string;
    address: {
        number: string;
        address: string;
        district: string;
        city: string;
        state: string;
    };
    phone: string;
}

export interface ExtendedStablishmentModel extends StablishmentModel {
    services: string[];
    geoLocation: {
        latitude: string;
        longitude: string;
    };

    contractWithSus: boolean;
    fantasyName: string;
    email: string;
    unitType: string;
    stablishmentType: string;
    natureDescription: string;

    openingHours: OpeningHoursModel[];
}

export interface OpeningHoursModel {
    day: string;
    startHour: string;
    endHour: string;
}
