import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Theme from "../comp/theme";
import Side from "../comp/side";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import { BASE_URL } from "../../config";

const Home = () => {
  const [current, setCurrent] = useState(null);
  const [searchtext, setsearchtext] = useState({ search: "" });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const send = async () => {
    try {
      const response = await axios.get(BASE_URL + "/api/home");
      if (response.data.status) {
        setCurrent(response.data.userdata);
      }
      if (response.data.status === false) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const search = async (eo) => {
    eo.preventDefault();
    try {
      const response = await axios.post(
        BASE_URL + "/api/home/search",
        searchtext
      );
      if (response.data.array) {
        setCurrent(response.data.array);
      }
      if (response.data.status === false) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetch = (params) => {
    if (searchtext.search.trim() === "") {
      send();
    }
  };
  useEffect(() => {
    if (!current) {
      send();
    }
  });

  if (current) {
    return (
      <>
        <Theme />
        <main className="d-flex flex-nowrap h-100">
          <Side />
          <section className="w-100">
            <nav className="navbar bg-body-tertiary navbar-dark bg-dark ">
              <div className="container-fluid justify-content-center justify-content-md-between">
                <a
                  className="navbar-brand fw-medium fs-3 mb-1 mb-md-0 "
                  href="!#"
                >
                  X-system 👋
                </a>
                <form onSubmit={search} className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    value={searchtext.search}
                    placeholder="Search"
                    aria-label="Search"
                    name="search"
                    onBlur={fetch}
                    onChange={(eo) => {
                      const clone = { ...searchtext };

                      clone[eo.target.name] = eo.target.value;

                      setsearchtext(clone);
                    }}
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </nav>

            {current.length !== 0 ? (
              <table
                style={{ width: "99%" }}
                className="text-center mx-auto table mt-5 table-striped table-bordered"
              >
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Country</th>
                    <th scope="col">Age</th>
                    <th scope="col">Last updated</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {current.map((item, index) => {
                    return (
                      <tr>
                        <th>{index + 1}</th>
                        <td>
                          {item.firstName} {item.lastName}{" "}
                        </td>
                        <td>{item.gender}</td>
                        <td>{item.country}</td>
                        <td>{item.age}</td>
                        <td>
                          {" "}
                          <Moment format="D MMM YYYY">{item.updatedAt}</Moment>
                        </td>
                        <td>
                          <a
                            data-bs-toggle="tooltip"
                            data-bs-title="View details"
                            data-bs-placement="top"
                            className="btn btn-primary btn-sm"
                            href={`/home/view/${item._id}`}
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </a>
                          <Link
                            to={`/edit/${item._id}`}
                            className="btn btn-primary btn-sm m-1"
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </Link>
                          <form style={{ display: "inline" }}>
                            <button
                              onClick={async () => {
                                try {
                                  const response = await axios.delete(
                                    `${BASE_URL}/api/home/delete/${item._id}`
                                  );
                                  if (response.data.action) {
                                    navigate("/home");
                                  }
                                  if (response.data.status === false) {
                                    navigate("/login");
                                  }
                                } catch (error) {
                                  console.error("Error fetching data:", error);
                                }
                              }}
                              type="submit"
                              data-bs-toggle="tooltip"
                              data-bs-title="Delete user"
                              data-bs-placement="top"
                              className="btn btn-danger btn-sm"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </form>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <h1>No data</h1>
            )}
          </section>
        </main>
      </>
    );
  }

  if (!current) {
    return <div>Loading...</div>;
  }
};

export default Home;
