/* eslint-disable no-unused-vars */
// eslint-disable-next-line
import React from "react";
// eslint-disable-next-line
import { shallow, mount } from "enzyme";
import App from "../src/App.jsx";

global.fetch = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        json: () => {
          return {
            visitsQuery: [
              {
                id: 1,
                date: "2012-07-01",
                word_id: 1
              },
              {
                id: 2,
                date: "2012-07-01",
                word_id: 1
              }
            ]
          };
        }
      });
    }, 0);
  });
};

describe("First React component test with Enzyme", () => {
  it("renders the chart without crashing", () => {
    expect(mount(<App />).find(".monthly-activity").length).toEqual(1);
  });

  it("fetches data from server when server returns a successful response", done => {
    document.body.innerHTML = `<div className="monthly-activity c3" id="chart"></div>`;

    const app = shallow(<App />);

    setTimeout(() => {
      app.update();
      expect(app.state()).toEqual({
        activity: [["x", "2012-07-01"], ["Activity", 2]]
      });
      done();
    }, 100);
  });
});
