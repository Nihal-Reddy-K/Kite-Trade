import React from "react";

function Rightimage({
  imageURL,
  productName,
  productDescription,
  learnMore,
}) {
  return (
    <div className="container">
      <div className="row align-items-center py-3">
        
        {/* Left Content */}
        <div className="col-5 p-5 mt-5">
          <h1>{productName}</h1>

          <p className="text-muted mt-4">
            {productDescription}
          </p>

          <div className="mt-4">
            <a
              href={learnMore}
              style={{ textDecoration: "none" }}
            >
              Learn More{" "}
              <i
                className="fa fa-long-arrow-right"
                aria-hidden="true"
              ></i>
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="col-5 p-5 ms-auto">
          <img
            src={imageURL}
            className="img-fluid product-image"
            alt={productName}
          />
        </div>
      </div>
    </div>
  );
}

export default Rightimage;
