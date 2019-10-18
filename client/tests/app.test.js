// eslint-disable-next-line
import React from "react";
// eslint-disable-next-line
import { shallow, mount } from "enzyme";
import App from "../src/App.jsx";

describe("First React component test with Enzyme", () => {
  it("works", () => {
    expect(App).toEqual(App);
  });

  it("renders without crashing", () => {
    shallow(<App />);
  });

  it("renders without crashing", () => {
    mount(<App />);
  });

  it("renders the chart without crashing", () => {
    expect(
      mount(<App />)
        .find("ActivityChart")
        .find(".monthly-activity").length
    ).toEqual(1);
  });
});
