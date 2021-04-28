import React from "react";
import "./Breadcumb.scss";

const Breadcumb = (props) => {
  return (
    <nav className="breadcumb-container">
      <ol className="breadcumb-list">
        <li
          className={`breadcumb-text ${
            props.Slide === 1 ? "slide1-information" : ""
          }`}
          onClick={() => props.setSlide(1)}
        >
          Information
        </li>
        <i class="fas fa-chevron-right breadcumb-arrow"></i>

        <li
          className={`breadcumb-text ${
            props.information ? "payment-on" : "payment-off"
          } ${props.Slide === 1 ? "" : "slide2"}`}
          onClick={() => {
            if (!props.information) {
              return;
            }
            props.setSlide(2);
          }}
        >
          Payment
        </li>
      </ol>
    </nav>
  );
};

export default Breadcumb;
