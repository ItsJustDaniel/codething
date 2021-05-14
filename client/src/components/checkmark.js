import React from "react";
import "./checkmark.scss";

const Checkmark = () => (
  <svg
    version="1.1"
    height="50"
    width="50"
    viewBox="0 0 130.2 130.2"
    className="checkmark"
  >
    <polyline
      className="path check"
      fill="none"
      stroke="white"
      stroke-width="20"
      stroke-linecap="round"
      stroke-miterlimit="10"
      points="100.2,40.2 51.5,88.8 29.8,67.5 "
    />
  </svg>
);

export default Checkmark;
