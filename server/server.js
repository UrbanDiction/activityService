const express = require("express");

const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(`${__dirname}/../public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./config/routes.js")(app);

app.listen(port, () => {
  console.log("Listening on", port);
});
