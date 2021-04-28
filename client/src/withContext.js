import React from "react";
import Context from "./Context";

const withContext = (WrappedComponent) => {
  const WithHOC = (props) => {
    console.log("Test");
    return (
      <Context.Consumer>
        {(context) => <WrappedComponent {...props} context={context} />}
      </Context.Consumer>
    );
  };
  return WithHOC;
};

export default withContext;
