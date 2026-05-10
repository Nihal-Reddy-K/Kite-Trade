import React from "react";

function Hero() {
  return (
    <div className="container border-bottom mb-3">
      <div className="text-center">
        <div className="row mt-5 p-3">
          <h1>Zerodha Products</h1>
          <h3 className="text-muted mt-3 fs-5">Sleek, modern, and intuitive trading platforms</h3>
          <p className="mt-3 mb-5">
            Check out our{" "}
            <a href="" style={{ textDecoration: "none" }}>
              investment offerings
            </a>{" "}
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
