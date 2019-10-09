const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/../public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require( '../config/routes.js' )( app )

app.listen(port, function () {
    console.log('Listening on', port);
});

