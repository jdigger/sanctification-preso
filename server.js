const Path = require("path");
const express = require("express");
// const logger = require('morgan')

const app = express();
const port = process.env.PORT || 8080;

// app.use(logger('dev'))

app.use(express.static(Path.join(__dirname, "/dist")));

app.get("*", (request, response) => {
  response.sendFile(Path.join(__dirname, "/dist/index.html"));
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
