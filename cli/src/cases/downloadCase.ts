import type { IScraping } from "../scraping/Iscraping.ts";

export class DownloadCase {
    private scraper: IScraping;
    constructor(scraper: IScraping) {
        this.scraper = scraper;
    }

    async execute(fileName: string, directory?: string) {
        try {
            await this.scraper.downloadFile(fileName, directory);
        } catch (error) {
            throw error;
        }
    }
}
