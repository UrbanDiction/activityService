/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import React from "react";
import App from "../client/src/App.jsx";

const ReactDOMServer = require("react-dom/server");

const express = require("express");

const bodyParser = require("body-parser");

const path = require("path");
const {
  queryGetVisitsForWord
} = require("../server/models/queryGetVisitsForWord.js");

const app = express();
const port = process.env.PORT || 8002;
const processArgs = process.argv.slice(2);

function dedupe(arr) {
  const output = {};
  for (let i = 0; i < arr.length; i += 1) {
    if (output[arr[i]]) {
      output[arr[i]]++;
    } else {
      output[arr[i]] = 1;
    }
  }
  return output;
}

app.use(express.static(path.join(__dirname, "/../public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/:word", (req, res) => {
  queryGetVisitsForWord(req.params.word, (error, visitsQuery) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      const dateArr = [];

      for (let i = 0; i < visitsQuery.length; i += 1) {
        dateArr.push(visitsQuery[i].date);
      }

      const dedupedVisits = dedupe(dateArr);

      const visits = [[], []];

      for (const key in dedupedVisits) {
        visits[0].push(key);
        visits[1].push(dedupedVisits[key]);
      }
      visits[0].unshift("x");
      visits[1].unshift("Activity");

      const reactString = ReactDOMServer.renderToString(<App data={visits} />);

      res.send(reactString);
    }
  });
});

app.listen(port, () => {
  if (processArgs.includes("development")) {
    // eslint-disable-next-line
    console.log("Listening on", port);
  }
});
