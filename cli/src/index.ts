import { App } from "./app.ts";
import fs from "fs";
import { FileDate } from "./utils/fileDate.ts";
import { appConfig } from "./app.config.ts";

import { Connection } from "./db/connection.ts";

const connection = new Connection();

console.log(await connection.connect());

//new App().run();
