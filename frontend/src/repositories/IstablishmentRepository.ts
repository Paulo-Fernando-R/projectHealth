import type StablishmentModel from "../models/stablishmentModel";

export default interface IStablishmentRepository {
    getStablishments(
        cityCode?: string,
        typeCode?: string,
        type?: string,
        name?: string
    ): Promise<StablishmentModel[]>;
}