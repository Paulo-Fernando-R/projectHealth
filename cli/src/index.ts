import { App } from "./app.ts";

import cron from "node-cron";

cron.schedule("0 15 16 * * *", async () => {
    new App().run();
});

//new App().run();
