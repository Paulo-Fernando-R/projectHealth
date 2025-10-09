import type IStablishmentRepository from "../repositories/IstablishmentRepository";

export default class GetStablishmentsCase {
    repository: IStablishmentRepository;
    constructor(repository: IStablishmentRepository) {
        this.repository = repository;
    }

    async execute(cityCode: string, type: string, typeCode: string, search: string, page: number) {
        return await this.repository.getStablishments(cityCode, type, typeCode, search, page);
    }
}
