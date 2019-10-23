/* eslint-disable no-unused-vars */
import React from "react";

export default function App({ data }) {
  return (
    <div
      className="monthly-activity c3"
      id="chart"
      data-monthly-activity={JSON.stringify(data)}
    ></div>
  );
}
