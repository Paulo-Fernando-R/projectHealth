import { App } from "./app.ts";
import fs from "fs";
import { FileDate } from "./utils/fileDate.ts";
import { appConfig} from "./app.config.ts";

//console.log(appConfig.scrapeUrl); //pathConfig.scrapeUrl;
new App().run();

// const testFolder = "./files/zip";

// const res = fs.readdirSync(testFolder);
// console.log(res);
// const lf = new FileDate().lastFileInDirectory(res);
// console.log(lf);

