import { App } from "./app.ts";

import cron from "node-cron";

cron.schedule("*5 * * * *", async () => {
    new App().run();
});

//new App().run();
