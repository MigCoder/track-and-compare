const fallback = require('express-history-api-fallback')
const express = require("express");
const expressStaticGzip = require("express-static-gzip");
const app = express();
const path = require('path');

app.use("/", expressStaticGzip(path.resolve(__dirname, "../build"), {}));
app.use(fallback(path.resolve(__dirname, "../build/index.html")));
app.listen(process.env.PORT || 3000);
