import React from "react";
import { NavLink } from "react-router-dom";
import "./CryptoNav.css";

function CryptoNav() {

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <ul className="nav-menu">
            <li className="nav-item">
              <NavLink
                to="/Bitcoin"
                activeClassName="navbar__link--active"
                className="navbar__link"
              >
                Bitcoin
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/Ethereum"
                activeClassName="navbar__link--active"
                className="navbar__link"
              >
                Ethereum
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default CryptoNav;
