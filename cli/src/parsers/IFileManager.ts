export interface IFileManager {
    listFiles(directory?: string): string[];
    deleteFile(directory: string | undefined, fileName: string): void;
}
