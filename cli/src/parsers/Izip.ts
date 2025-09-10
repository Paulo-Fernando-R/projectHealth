import type { IFileManager } from "./IFileManager.ts";

export interface IZip {
    fileManager: IFileManager;
    unzip(filePath: string, extractTo: string): void;
}
