export interface IFileManager {
    listFiles(directory?: string): string[];
    deleteFile(directory: string | undefined, fileName: string): void;
    emptyDirectory(directory: string): void;
    emptyDirectoryExcept(directory: string, fileToKeep: string): void;
}
