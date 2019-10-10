// eslint-disable-next-line
import React from "react";
// eslint-disable-next-line
import { shallow, mount } from "enzyme";
import App from "../src/App.jsx";

it("works", () => {
  expect(App).toEqual(App);
});

describe("First React component test with Enzyme", () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });
});
