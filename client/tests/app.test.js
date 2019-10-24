/* eslint-disable no-unused-vars */
// eslint-disable-next-line
import React from "react";
// eslint-disable-next-line
import { mount } from "enzyme";
import App from "../src/App.jsx";

describe("First React component test with Enzyme", () => {
  it("renders the chart without crashing", () => {
    expect(mount(<App />).find(".monthly-activity").length).toEqual(1);
  });
});
