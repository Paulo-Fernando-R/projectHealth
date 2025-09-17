import type { IStablishmentRepository } from "../db/IstablishmentRepository.ts";

export class InsertStablishmentsCase {
    repository: IStablishmentRepository;
    filePath: string;
    constructor(repository: IStablishmentRepository, filePath: string) {
        this.repository = repository;
        this.filePath = filePath;
    }

    async execute() {
        try {
            console.log(`Inserting file: ${this.filePath}...`);
            await this.repository.insertFile(this.filePath);
            console.log("File inserted!");
        } catch (error) {
            throw error;
        }
    }
}
