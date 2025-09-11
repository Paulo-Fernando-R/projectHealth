import { App } from "./app.ts";
import fs from "fs";
import { FileDate } from "./utils/fileDate.ts";
import { appConfig } from "./app.config.ts";

import { Connection } from "./db/connection.ts";
import { CsvParser } from "./parsers/csvParser.ts";

const csv = new CsvParser();
const data = await csv.parse();


// const connection = new Connection();

// console.log(await connection.connect());
// await connection.disconnect();

//new App().run();
