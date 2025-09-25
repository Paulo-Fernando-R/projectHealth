process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require("express");
const Unblocker = require("unblocker");

const app = express();

const unblocker = new Unblocker({
    prefix: "/proxy/",
  
    agentOptions: {
        rejectUnauthorized: false, 
    },
});

const port = 3000;
app.use(unblocker);

app.listen(port).on("upgrade", unblocker.onUpgrade);
console.log(`proxy running on http://localhost:${port}/proxy/`);
