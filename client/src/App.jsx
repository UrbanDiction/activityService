/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: this.props.data
    };
  }

  componentDidMount() {
    this.populateC3Grid();
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
    return <div className="monthly-activity c3" id="chart"></div>;
  }
}

export default App;
