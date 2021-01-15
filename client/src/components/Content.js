import React from "react";
import Footer from "./Footer";
import "./Content.css";

const Content = (props) => (
  <div className="Content-Container">
    <div className="Content">{props.children}</div>
    <Footer />
  </div>
);

export default Content;
