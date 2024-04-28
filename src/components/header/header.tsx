import { Link } from "react-router-dom";

import "./header.css";

import { default as HouseIcon } from "../icons/home.tsx";
import { default as LibraryIcon } from "../icons/library.tsx";
import { default as SearchIcon } from "../icons/search.tsx";

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <h1 className="navbar-title">React Libraries</h1>
        <ul className="navbar-list">
          <li className="navbar-item">
            <HouseIcon className="navbar-icon" />
            <Link to="/">Home</Link>
          </li>
          <li className="navbar-item">
            <LibraryIcon className="navbar-icon" />
            <Link to="/libraries">Libraries</Link>
          </li>
          <li className="navbar-item">
            <SearchIcon className="navbar-icon" />
            <Link to="/search">Search</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
