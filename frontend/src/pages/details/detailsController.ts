import GetStablishmentByIdCase from "../../cases/getStablishmentByIdCase";
import type IStablishmentRepository from "../../repositories/IstablishmentRepository";
import StablishmentRepository from "../../repositories/stablishmentRepository";
import CustomAxios from "../../services/customAxios";
import type { IcustomAxios } from "../../services/IcustomAxios";

export default class DetailsController {
    axios: IcustomAxios;
    stablishmentRepository: IStablishmentRepository;
    getStablihmentByIdCase: GetStablishmentByIdCase;

    constructor() {
        this.axios = new CustomAxios();
        this.stablishmentRepository = new StablishmentRepository(this.axios);
        this.getStablihmentByIdCase = new GetStablishmentByIdCase(this.stablishmentRepository);
    }

    getStablishmentById(id: string) {
        return this.getStablihmentByIdCase.execute(id);
    }
}
