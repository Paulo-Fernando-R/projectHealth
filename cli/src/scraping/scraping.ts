import puppeteer from "puppeteer";
import { Downloader } from "nodejs-file-downloader";
import type { ScrapedFile } from "../models/scrapedFile.js";
import type { IScraping } from "./Iscraping.ts";
import { NotFoundError } from "../errors/customErrors.ts";
import { error } from "console";

export class Scraping implements IScraping {
    scrapeUrl: string;
    downloadUrl: string;

    constructor(scrapeUrl: string, downloadUrl: string) {
        this.scrapeUrl = scrapeUrl;
        this.downloadUrl = downloadUrl;
    }

    public async fetchData() {
        const browser = await puppeteer.launch({ headless: true });

        const page = await browser.newPage();

        await page.goto(this.scrapeUrl);

        const elements = await page.$$(".ng-scope");

        if (elements.length === 0) {
            throw new NotFoundError("No elements found");
        }

        const el = elements[0];
        const attr = await el?.$eval("a", (a) => {
            return {
                href: a.getAttribute("href"),
                text: a.textContent,
            };
        });

        browser.close();

        if (!attr) {
            throw new NotFoundError("No attribute found");
        }
        if (!this.verifyDate(attr.text!)) {
            return;
        }

        return attr;
    }

    private verifyDate(dateStr: string): boolean {
        const date = dateStr.match(/\d+/g);

        if (!date || date.length === 0) {
            console.log("No date found");
            return false;
        }

        //!TODO: verify if date is newer than last date

        console.log("Date found:", date[0]);

        return true;
    }

    public async downloadFile(fileName: string, directory = "./files") {
        if (!fileName) {
            console.log("No attr found");
            return;
        }

        const downloader = new Downloader({
            url: this.downloadUrl + fileName,
            directory: directory,
            onProgress: (percentage, chunk, remainSize) => {
                console.log("%", percentage);
                console.log("chunk", chunk);
                console.log("remainSize", remainSize);
            },
        });

        console.log("Downloading file...");
        await downloader.download();
        console.log("File downloaded!");
    }
}
