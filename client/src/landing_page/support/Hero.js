import React from "react";
import { FaSearch } from "react-icons/fa";

function Hero() {
  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundColor: "#387ed1",
        minHeight: "72vh",
      }}
    >
      <div className="container text-white">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h4 className="fw-semibold" style={{ fontSize: "2rem" }}>
            Support Portal
          </h4>

          <a
            href=""
            className="text-white text-decoration-none border-bottom pb-1"
          >
            Track tickets
          </a>
        </div>

        <div className="row align-items-start">
          <div className="col-lg-7 pe-lg-5">
            <h1
              className="fw-semibold mb-4"
              style={{
                fontSize: "3rem",
                lineHeight: "1.3",
              }}
            >
              Search for an answer or browse help topics to create a ticket
            </h1>

            <div
              className="bg-white rounded d-flex align-items-center px-4 shadow-sm mb-4"
              style={{
                maxWidth: "760px",
                height: "72px",
              }}
            >
              <FaSearch className="text-muted me-3" size={18} />

              <input
                type="text"
                placeholder="Eg. how do I activate F&O, why is my order rejected ..."
                className="border-0 w-100 bg-transparent"
                style={{
                  outline: "none",
                  fontSize: "1.05rem",
                }}
              />
            </div>

            <div
              className="d-flex flex-wrap"
              style={{
                gap: "22px",
                rowGap: "14px",
                fontSize: "1rem",
              }}
            >
              <a
                href=""
                className="text-white text-decoration-none border-bottom pb-1"
              >
                Track account opening
              </a>

              <a
                href=""
                className="text-white text-decoration-none border-bottom pb-1"
              >
                Track segment activation
              </a>

              <a
                href=""
                className="text-white text-decoration-none border-bottom pb-1"
              >
                Intraday margins
              </a>

              <a
                href=""
                className="text-white text-decoration-none border-bottom pb-1"
              >
                Kite user manual
              </a>
            </div>
          </div>

          <div className="col-lg-5 mt-5 mt-lg-0">
            <h3
              className="fw-semibold mb-4"
              style={{
                fontSize: "2.2rem",
              }}
            >
              Featured
            </h3>

            <ol
              className="ps-4"
              style={{
                lineHeight: "2",
                fontSize: "1.1rem",
              }}
            >
              <li className="mb-4">
                <a href="" className="text-white">
                  Exclusion of F&O contracts on 8 securities from August 2026
                </a>
              </li>

              <li className="mb-4">
                <a href="" className="text-white">
                  Revision in expiry day of Index and Stock derivatives
                  contracts
                </a>
              </li>

              <li>
                <a href="" className="text-white">
                  Latest updates on intraday leverages and margin policies
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
