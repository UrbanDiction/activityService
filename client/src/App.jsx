import React from "react";

const fetch = require("node-fetch");

class App extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    fetch("/activity/word/getVisits", {
      method: "POST",
      body: JSON.stringify({ word: "test" }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => {
        // console.log(data);
        return data.json();
      })
      .then(({ visitsQuery }) => {
        const visits = [[], []];

        for (let i = 0; i < visitsQuery.length; i += 1) {
          visits[0].push(visitsQuery[i].date);
          visits[1].push(1);
        }
        visits[0].unshift("x");
        visits[1].unshift("Activity");

        console.log(visits);

        const chart = document.getElementById("chart");
        if (chart) {
          // eslint-disable-next-line no-unused-vars
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
          // eslint-disable-next-line no-undef
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
              columns: visits,
              type: "bar"
            },
            // tooltip: {
            //   // eslint-disable-next-line no-unused-vars
            //   contents(data, defaultTitleFormat, defaultValueFormat, color) {
            //     return `<table class="c3-tooltip"><tr><td>${
            //       months[data[0].x.getMonth()]
            //     } ${data[0].x.getFullYear()}</td></tr></table>`;
            //   }
            // },
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
      });
  }

  // eslint-disable-next-line
  render() {
    return <div>React loaded!!!</div>;
  }
}

export default App;
