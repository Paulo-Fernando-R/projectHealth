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
            // console.log(`Inserting file: ${this.filePath}...`);
            // await this.repository.insertFile(this.filePath);
            // console.log("File inserted!\n");

            const empty = await this.repository.verifyTableEmpty();

            if (empty) {
                console.log(`Inserting file: ${this.filePath}...`);
                await this.repository.insertFile(this.filePath);
                console.log("File inserted!\n");
                return;
            }

            console.log(`Updating file: ${this.filePath}...`);
            await this.repository.updateTable(this.filePath);
            console.log("File updated!\n");
        } catch (error) {
            throw error;
        }
    }
}
