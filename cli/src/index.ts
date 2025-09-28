import { App } from "./app.ts";

import cron from "node-cron";

// cron.schedule("*/15 * * * *", async () => {
//     new App().run();
// });

cron.schedule("59 23 * * *", async () => {
    new App().run();
});

//new App().run();
