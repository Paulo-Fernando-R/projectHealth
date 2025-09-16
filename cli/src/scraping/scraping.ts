import { FileAlreadyNewerError, NotFoundError } from "../errors/customErrors.ts";
import type { IFileManager } from "../parsers/IFileManager.ts";
import { Downloader } from "nodejs-file-downloader";
import type { IScraping } from "./Iscraping.ts";
import { FileDate } from "../utils/fileDate.ts";
import puppeteer from "puppeteer";
import * as https from "https"

export class Scraping implements IScraping {
    scrapeUrl: string;
    downloadUrl: string;
    fileDate: FileDate;
    fileManager: IFileManager;
    scrapeElement: string;
    zipPath: string;

    constructor(
        scrapeUrl: string,
        downloadUrl: string,
        fileManager: IFileManager,
        fileDate: FileDate,
        scrapeElement: string,
        zipPath: string
    ) {
        this.scrapeUrl = scrapeUrl;
        this.downloadUrl = downloadUrl;
        this.fileManager = fileManager;
        this.fileDate = fileDate;
        this.scrapeElement = scrapeElement;
        this.zipPath = zipPath;
    }

    public async fetchData() {
        const browser = await puppeteer.launch({ headless: true });

        const page = await browser.newPage();

        await page.goto(this.scrapeUrl);

        const elements = await page.$$(this.scrapeElement);

        if (elements.length === 0) {
            throw new NotFoundError("No elements found");
        }

        const el = elements[0];
        const attr = await el?.$eval("a", (a) => {
            return {
                href: a.getAttribute("href")!,
                text: a.textContent,
            };
        });

        browser.close();

        if (!attr) {
            throw new NotFoundError("No attribute found");
        }
        if (!this.verifyDate(attr.text!)) {
            throw new FileAlreadyNewerError("File is not newer than the last one");
        }

        return attr;
    }

    private verifyDate(dateStr: string): boolean {
        const currentDate = this.fileDate.getFileDate(dateStr);
        let fileList: string[] = [];
        let lastFile = "";

        try {
            fileList = this.fileManager.listFiles(this.zipPath);
            lastFile = this.fileDate.lastFileInDirectory(fileList);
        } catch (error) {
            return true;
        }

        const lastDate = this.fileDate.getFileDate(lastFile);

        if (currentDate > lastDate) {
            return true;
        }

        return false;
    }

    public async downloadFile(fileName: string, directory: string) {
        let deduced = "";

        const downloader = new Downloader({

            url: this.downloadUrl + fileName,
            directory: directory,
            maxAttempts: 3,
            
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),

            onBeforeSave: (deducedName) => {
                deduced = deducedName;
                return deducedName;
            },
        });

        console.warn("Downloading file...");
        await downloader.download();
        console.warn(`File ${deduced} downloaded!`);

        try {
            this.fileManager.emptyDirectoryExcept(directory, deduced);
        } catch (error) {
            console.warn("File not deleted, needs your attention");
        }
    }
}
