import type { IStablishmentServiceRepository } from "../db/IstablishmentServiceRepository.ts";

export class InsertStablishmentServicesCase {
    repository: IStablishmentServiceRepository;
    filePath: string;
    constructor(repository: IStablishmentServiceRepository, filePath: string) {
        this.repository = repository;
        this.filePath = filePath;
    }

    async execute() {
        try {
            console.log(`Inserting file: ${this.filePath}...`);
            await this.repository.insertFile(this.filePath);
            console.log("File inserted!\n");
        } catch (error) {
            throw error;
        }
    }
}
