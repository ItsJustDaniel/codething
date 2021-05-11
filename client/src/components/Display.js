import React from "react";
import Footer from "./Footer";
import "./Display.css";
import Header from "./Header";

const Display = (props) => {
  return (
    <div className="Content-Container">
      <div className="Content">
        <Header
          navbarPush={props.navbarPush}
          cartItems={props.cartItems}
          currencySwitch={props.currencySwitch}
          currency={props.currency}
        />
        {props.children}
      </div>
      <Footer className="footer" />
    </div>
  );
};

export default Display;
