import { App } from "./app.ts";

import cron from "node-cron";

cron.schedule("*/15 * * * *", async () => {
    new App().run();
});

//new App().run();
