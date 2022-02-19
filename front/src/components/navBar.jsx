import React from "react";

function NavBar({ numberOfCounters }) {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
          <span className="badge rounded-pill bg-secondary m-2">
            {numberOfCounters}
          </span>
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
