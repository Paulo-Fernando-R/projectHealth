import type IMetadataRepository from "../repositories/ImetadataRepository";

export default class GetTypesCase {
    repository: IMetadataRepository;
    constructor(repository: IMetadataRepository) {
        this.repository = repository;
    }
    async execute() {
        return await this.repository.getTypes();
    }
}
