const express = require("express");
const expressStaticGzip = require("express-static-gzip");
const app = express();
const path = require('path');

app.use("/", expressStaticGzip(path.resolve(__dirname, "../build"), {}));

app.listen(3000, () => console.log('Server started'));
