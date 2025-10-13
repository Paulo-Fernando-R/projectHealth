import type { ExtendedStablishmentModel } from "../models/stablishmentModel";
import type StablishmentModel from "../models/stablishmentModel";

export default interface IStablishmentRepository {
    getStablishments(
        cityCode: string,
        type: string,
        typeCode: string,
        search: string,
        page: number
    ): Promise<StablishmentModel[]>;

    getStablishmentById(id: string): Promise<ExtendedStablishmentModel>;
}
