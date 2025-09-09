import { Scraping } from "./scraping/scraping.ts";
import { Zip } from "./parsers/zip.ts";

async function main() {
    const scraping = new Scraping(
        "https://cnes.datasus.gov.br/pages/downloads/arquivosBaseDados.jsp",
        "https://cnes.datasus.gov.br/"
    );

    const attr = await scraping.fetchData();
    console.log(attr);
    if (!attr) {
        console.log("No attr found");
        return;
    }
    await scraping.downloadFile(attr);

    Zip.unzip("./files/BASE_DE_DADOS_CNES_202507.ZIP", "./files/unzip");
}

try {
    main();
} catch (error) {
    console.log(error);
}
