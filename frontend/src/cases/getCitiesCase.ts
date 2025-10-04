import type IMetadataRepository from "../repositories/ImetadataRepository";

export default class GetCitiesCase {
    repository: IMetadataRepository;
    constructor(repository: IMetadataRepository) {
        this.repository = repository;
    }

    async execute() {
        return await this.repository.getCities();
    }
}
