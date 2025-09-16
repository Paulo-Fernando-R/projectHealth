import type { IScraping } from "../scraping/Iscraping.ts";

export class ScrapeCase {
    private scraper: IScraping;

    constructor(scraper: IScraping) {
        this.scraper = scraper;
    }

    async execute() {
        try {
            console.log("Scraping data...");
            const attr = await this.scraper.fetchData();
            console.log("Data scraped!");
            return attr;
        } catch (error) {
            throw error;
        }
    }
}
