import { App } from "./app.ts";
import fs from "fs";
//new App().run();

const testFolder = "./files/";

const res = fs.readdirSync(testFolder);
console.log(res);
try{
fs.unlinkSync(testFolder + res[1]);
    console.log("excluded");
}
catch(error){
    console.log("not excluded");
}


console.log(res);