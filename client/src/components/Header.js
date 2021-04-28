import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

const Header = ({ navbarPush, cartItems }) => {
  return (
    <div className={navbarPush}>
      <ul className="navbar">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/cart">
          <i className="fas fa-shopping-cart"></i>
          <h6 className="nav-cart">{cartItems}</h6>
        </Link>
      </ul>
    </div>
  );
};

export default Header;
