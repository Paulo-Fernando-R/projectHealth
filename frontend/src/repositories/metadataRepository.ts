import type { IcustomAxios } from "../services/IcustomAxios";
import {
    BadRequestError,
    CustomError,
    InternalServerError,
    NotFoundError,
    UnknownError,
} from "../errors/customErrors";
import type CityModel from "../models/cityModel";
import type TypeModel from "../models/typeModel";
import type IMetadataRepository from "./ImetadataRepository";

export default class MetadataRepository implements IMetadataRepository {
    axios: IcustomAxios;
    constructor(axios: IcustomAxios) {
        this.axios = axios;
    }

    async getCities() {
        try {
            const res = await this.axios.instance.get<CityModel[]>("/Home/Cities");

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

    async getTypes() {
        try {
            const res = await this.axios.instance.get<TypeModel[]>("/Home/Types");

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
