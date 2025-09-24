import type { ScrapedFile } from "../models/scrapedFile.ts";
import type { IFileManager } from "../parsers/IFileManager.ts";
import type { ConfigType } from "../types/configType.ts";
import type { FileDate } from "../utils/fileDate.ts";

export interface IScraping {
    fetchData(): Promise<ScrapedFile>;
    downloadFile(fileName: string, directory?: string): Promise<void>;
    appConfig:ConfigType
    fileDate: FileDate;
    fileManager:IFileManager;
}
