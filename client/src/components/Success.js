import React, { useEffect } from "react";
import withContext from "../withContext";
import "./Success.scss";

const Success = (props) => {
  useEffect(() => {
    props.context.shouldNavPush();
  }, [props.context.shouldNavPush, props.context]);

  return (
    <div className="success-container">
      <h1>Success!</h1>
      <h2>Thank you for your order</h2>
    </div>
  );
};

export default withContext(Success);
