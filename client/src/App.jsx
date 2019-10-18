/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */

import React from "react";

import ActivityChart from "./components/activity/ActivityChart.jsx";

const fetch = require("node-fetch");

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activity: null
    };
  }

  componentDidMount() {
    fetch("http://localhost:8002/activity/word/getVisits", {
      method: "POST",
      body: JSON.stringify({ word: "test" }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => {
        return data.json();
      })
      .then(({ visitsQuery }) => {
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

        this.setState({ activity: visits });
        this.populateC3Grid();
      })
      .catch(err => {
        // Disabled for testing...
        // console.log(err);
      });
  }

  populateC3Grid() {
    const chart = document.getElementById("chart");
    if (chart) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      c3.generate({
        size: {
          height: 200
        },
        padding: {
          left: 10,
          right: 10
        },
        data: {
          x: "x",
          columns: this.state.activity,
          type: "bar"
        },
        tooltip: {
          contents(data, defaultTitleFormat, defaultValueFormat, color) {
            return `<table class="c3-tooltip"><tr><td>${
              months[data[0].x.getMonth()]
            } ${data[0].x.getFullYear()}</td></tr></table>`;
          }
        },
        grid: {
          x: {
            show: false
          }
        },
        axis: {
          x: {
            type: "timeseries",
            tick: {
              count: 2,
              show: false,
              format: "%Y",
              outer: false
            }
          },
          y: {
            show: false
          }
        },
        legend: {
          show: false
        },
        bar: {
          width: 1
        }
      });
    }
  }

  render() {
    return (
      <div>
        <ActivityChart />
      </div>
    );
  }
}

export default App;
