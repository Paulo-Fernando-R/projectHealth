import { NotFoundError } from "../errors/customErrors.ts";
import type { IScraping } from "../scraping/Iscraping.ts";

export class ScrapeCase {
    private scraper: IScraping;
    constructor(scraper: IScraping) {
        this.scraper = scraper;
    }

    async execute() {
        try {
            const attr = await this.scraper.fetchData();
            
            return attr;
        } catch (error) {
            throw error;
        }
    }
}
