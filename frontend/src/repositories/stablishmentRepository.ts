import {
    BadRequestError,
    CustomError,
    InternalServerError,
    NotFoundError,
    UnknownError,
} from "../errors/customErrors";
import type StablishmentModel from "../models/stablishmentModel";
import type { IcustomAxios } from "../services/IcustomAxios";
import type IStablishmentRepository from "./IstablishmentRepository";

export default class StablishmentRepository implements IStablishmentRepository {
    axios: IcustomAxios;

    constructor(axios: IcustomAxios) {
        this.axios = axios;
    }

    async getStablishments(
        cityCode: string,
        type: string,
        typeCode: string,
        search: string,
        page: number
    ) {
        const data = {
            name: search,
            types:
                type && typeCode
                    ? [
                          {
                              type: parseInt(type),
                              typeCode: parseInt(typeCode),
                          },
                      ]
                    : [],
            cities: cityCode ? [cityCode] : [],
            limit: 10,
            skip: page,
        };

        try {
            const res = await this.axios.instance.put<StablishmentModel[]>("/Home/Search", data);

            if (res.status === 400) {
                throw new BadRequestError();
            }

            if (res.status === 500) {
                throw new InternalServerError();
            }

            if (res.status === 404) {
                throw new NotFoundError();
            }

            if (res.status !== 200) {
                throw new InternalServerError();
            }

            return res.data;
        } catch (error) {
            console.error(error);
            if (error instanceof CustomError) {
                throw error;
            }

            throw new UnknownError("An unknown error occurred");
        }
    }
}
