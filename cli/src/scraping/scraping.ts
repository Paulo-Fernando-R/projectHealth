import {
    DownloadError,
    FileAlreadyNewerError,
    NotFoundError,
    ScrapeError,
} from "../errors/customErrors.ts";
import type { IFileManager } from "../parsers/IFileManager.ts";
import { Downloader } from "nodejs-file-downloader";
import type { IScraping } from "./Iscraping.ts";
import { FileDate } from "../utils/fileDate.ts";
import puppeteer from "puppeteer";
import * as https from "https";
import type { ConfigType } from "../types/configType.ts";

export class Scraping implements IScraping {
    appConfig: ConfigType;
    fileDate: FileDate;
    fileManager: IFileManager;

    constructor(appConfig: ConfigType, fileManager: IFileManager, fileDate: FileDate) {
        this.appConfig = appConfig;
        this.fileManager = fileManager;
        this.fileDate = fileDate;
    }

    public async fetchData() {
        const browser = await puppeteer.launch({ headless: true });

        const page = await browser.newPage();

        const finalUrl =
            this.appConfig.proxyUrl +
            this.appConfig.scrapeUrl +
            this.appConfig.proxyToken +
            this.appConfig.proxyOptions;

        try {
            await page.goto(this.appConfig.scrapeUrl, {
                waitUntil: "networkidle2",
                timeout: 30000,
            });

            const elements = await page.$$(this.appConfig.scrapeElement);

            if (elements.length === 0) {
                throw new NotFoundError("No elements found");
            }

            const el = elements[0];
            await el?.click();
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
        } catch (error) {
            throw new ScrapeError("Error while scraping data" + error);
        }
    }

    private verifyDate(dateStr: string): boolean {
        const currentDate = this.fileDate.getFileDate(dateStr);
        let fileList: string[] = [];
        let lastFile = "";

        try {
            fileList = this.fileManager.listFiles(this.appConfig.zipPath);
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

        const finalUrl = this.appConfig.proxyDownload + this.appConfig.downloadUrl + fileName;

        const downloader = new Downloader({
            url: this.appConfig.downloadUrl + fileName,
            directory: directory,
            maxAttempts: 2,

            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            }),

            onBeforeSave: (deducedName) => {
                deduced = deducedName;
                return deducedName;
            },
        });

        console.warn("Downloading file...");
        try {
            await downloader.download();
        } catch (error) {
            throw new DownloadError("Error downloading file" + error);
        }

        console.warn(`File ${deduced} downloaded!`);

        try {
            this.fileManager.emptyDirectoryExcept(directory, deduced);
        } catch (error) {
            console.warn("File not deleted, needs your attention");
        }
    }
}
