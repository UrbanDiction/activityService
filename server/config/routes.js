/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
const ReactDOMServer = require("react-dom/server");

const React = require("react");

const App = require("../../client/src/App.jsx");

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
const { queryGetVisitsForWord } = require("../models/queryGetVisitsForWord.js");

module.exports = app => {
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

        const component = React.createElement(App, { data: visits });

        const reactString = ReactDOMServer.renderToString(component);

        console.log(reactString);

        res.send(reactString);
      }
    });
  });
};
