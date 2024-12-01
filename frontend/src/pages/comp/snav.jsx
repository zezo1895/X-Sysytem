import React from 'react';
import "../comp/snav.css"
const Snav = () => {
  return (
    <nav className="navbar bg-body-tertiary navbar-dark bg-dark ">
    <div className="container-fluid justify-content-center justify-content-md-between">
      <a className="navbar-brand fw-medium fs-3 mb-1 mb-md-0" href="!#">
      X-system 👋
      </a>
      <form action="/search" method="post" className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          name="search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  </nav>
  
  );
}

export default Snav;
