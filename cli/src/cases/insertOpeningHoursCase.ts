import type { IOpeningHoursRepository } from "../db/IopeningHoursRepository.ts";

export class InsertOpeningHoursCase {
    repository: IOpeningHoursRepository;
    filePath: string;
    constructor(repository: IOpeningHoursRepository, filePath: string) {
        this.repository = repository;
        this.filePath = filePath;
    }

    async execute(){
        try {
            console.log(`Inserting file: ${this.filePath}...`);
            await this.repository.insertFile(this.filePath);
            console.log("File inserted!\n");
        } catch (error) {
            throw error;
        }
    }
}
