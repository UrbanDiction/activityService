const express = require("express");

const bodyParser = require("body-parser");

const path = require("path")

const app = express();
const port = process.env.PORT || 8000;
const processArgs = process.argv.slice(2)

app.use(express.static(path.join(__dirname, '/../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./config/routes.js")(app);

app.listen(port, () => {
  if (processArgs.includes("development")) {
    console.log("Listening on", port);
  }
});
