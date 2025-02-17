import React from "react";
import "./Header.scss";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";

const Header = () => {
  const location = useLocation();
  const hideHeaderPaths = ["/sign-in", "/sign-up"];

  if (hideHeaderPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <header className="header">
      <div className="container">
        <nav className="header__nav">
          <div className="header__logo">
            <Link to={"/"}>Badiiyat</Link>
          </div>
          <div className="header__right">
            <ul className="header__link">
              <li className="header__link-item">
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Bosh sahifa
                </NavLink>
              </li>
              <li className="header__link-item">
                <NavLink
                  to="/nasr"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Nasr
                </NavLink>
              </li>
              <li className="header__link-item">
                <NavLink
                  to="/nazm"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Nazm
                </NavLink>
              </li>
              <li className="header__link-item">
                <NavLink
                  to="/maqolalar"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Maqolalar
                </NavLink>
              </li>
              <li className="header__link-item">
                <NavLink
                  to="/forum"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Forum
                </NavLink>
              </li>
            </ul>
            <Link to={"/profil"} className="header__user-img">
              <img
                src="https://banner2.cleanpng.com/20180404/sqe/avhxkafxo.webp"
                alt="User images"
              />
              <FaAngleDown />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
