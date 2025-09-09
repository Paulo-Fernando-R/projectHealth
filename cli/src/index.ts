import puppeteer from "puppeteer";
import {Downloader} from "nodejs-file-downloader";
import AdmZip from "adm-zip";

async function pupper() {
    const browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();

    await page.goto("https://cnes.datasus.gov.br/pages/downloads/arquivosBaseDados.jsp");

    const elements = await page.$$(".ng-scope");

    if (elements.length === 0) {
        console.log("No elements found");
        return;
    }

    const el = elements[0];
    const attr = await el?.$eval("a", (a) => {
        return {
            href: a.getAttribute("href"),
            text: a.textContent,
        };
    });

    const date = attr?.text.match(/\d+/g);

    if (!date || date.length === 0) {
        console.log("No date found");
        return;
    }

    //console.log(date[0]);
    browser.close();

    return attr;
}

async function download(){

    const attr = await pupper();
    console.log(attr);

    if (!attr) {
        console.log("No attr found");
        return;
    }

    const downloader = new Downloader({
        url:"https://cnes.datasus.gov.br/"+attr.href!,
        directory: "./files",
        onProgress: (percentage, chunk, remainSize) =>{
            console.log("%", percentage);
            console.log("chunk", chunk);
            console.log("remainSize", remainSize);
        }
    })

    console.log("Downloading file...");
    await downloader.download();
    console.log("File downloaded!");
}

async function unzip(){
    const zip = new AdmZip("./files/BASE_DE_DADOS_CNES_202507.ZIP");

    console.log("Unzipping file...");
    zip.extractAllTo("./files/unzip", true);
    console.log("File unzipped!");
}

async function main(){
   // await download();
    await unzip();
}

try{
    main();
} catch (error) {
    console.log(error);
}
