import type IStablishmentRepository from "../repositories/IstablishmentRepository";

export default class GetStablishmentByIdCase {
    repository: IStablishmentRepository;

    constructor(repository: IStablishmentRepository) {
        this.repository = repository;
    }

    execute(id: string) {
        return this.repository.getStablishmentById(id);
    }
}
