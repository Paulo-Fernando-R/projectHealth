import type { ConfigType } from "./types/configType.ts";

export const appConfig: ConfigType = {
    scrapeUrl: "https://cnes.datasus.gov.br/pages/downloads/arquivosBaseDados.jsp",
    downloadUrl: "https://cnes.datasus.gov.br/",
    zipPath: "./files/zip/",
    unzipPath: "./files/unzip/",
    scrapeElement: ".ng-scope",

    //datbase connection
    //example credentials for mysql
    host: "localhost",
    user: "root",
    password: "root",
    database: "healthstablishments",
};
