export interface IStablishmentServiceRepository {
    insertFile(file: string): Promise<void>;
}
