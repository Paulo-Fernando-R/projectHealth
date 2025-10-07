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
