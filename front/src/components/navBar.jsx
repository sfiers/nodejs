import React from "react";

function NavBar({ numberOfCounters }) {
  return (
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
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
