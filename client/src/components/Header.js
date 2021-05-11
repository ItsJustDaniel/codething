import React, { useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

const Header = ({ navbarPush, cartItems, currencySwitch, currency }) => {
  return (
    <div className={navbarPush}>
      <ul className="navbar">
        <div className="dropdown">
          <button className="dropbtn">
            {currency} <i class="fas fa-chevron-down"></i>
          </button>
          <div className="dropdown-content">
            <li
              className="dropdown-option"
              onClick={() => {
                currencySwitch("AUD");
              }}
            >
              AUD $
            </li>
            <li
              className="dropdown-option"
              onClick={() => {
                currencySwitch("USD");
              }}
            >
              USD $
            </li>
            <li
              className="dropdown-option"
              onClick={() => {
                currencySwitch("CAD");
              }}
            >
              CAD $
            </li>
            <li
              className="dropdown-option"
              onClick={() => {
                currencySwitch("EUR");
              }}
            >
              EUR €
            </li>
          </div>
        </div>
        <div className="nav-right">
          <Link className="nav-link" to="/contact">
            Contact
          </Link>
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/cart">
            <i className="fas fa-shopping-cart"></i>
            <h6 className="nav-cart">{cartItems}</h6>
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default Header;
