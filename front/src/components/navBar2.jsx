import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";

function NavBar2({ jwt }) {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Vidly
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-link" to="/movies">
                Movies
              </NavLink>
              <NavLink className="nav-link" aria-current="page" to="/customers">
                Customers
              </NavLink>
              <NavLink className="nav-link" to="/rentals">
                Rentals
              </NavLink>
              {!jwt.name && (
                <>
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </>
              )}
              {jwt.name && (
                <>
                  <NavLink className="nav-link" to="/profile">
                    {jwt.name}
                  </NavLink>
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </React.Fragment>
  );
}

export default NavBar2;
