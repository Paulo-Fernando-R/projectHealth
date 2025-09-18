export interface IOpeningHoursRepository {
    insertFile(file: string): Promise<void>;
  
}