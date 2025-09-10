import { App } from "./app.ts";
import fs from "fs";
import { FileDate } from "./utils/fileDate.ts";
new App().run();

// const testFolder = "./files/zip";

// const res = fs.readdirSync(testFolder);
// console.log(res);
// const lf = new FileDate().lastFileInDirectory(res);
// console.log(lf);

