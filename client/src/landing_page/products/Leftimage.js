import React from "react";

function Leftimage({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container">
      <div className="row align-items-center py-3">
        
        <div className="col-5 p-5">
          <img
            src={imageURL}
            className="img-fluid product-image"
            alt={productName}
          />
        </div>

        <div className="col-5 p-5 mt-5 ms-auto">
          <h1>{productName}</h1>

          <p className="text-muted mt-4">
            {productDescription}
          </p>

          <div className="mt-4">
            <a
              href={tryDemo}
              style={{ textDecoration: "none" }}
            >
              Try Demo{" "}
              <i
                className="fa fa-long-arrow-right"
                aria-hidden="true"
              ></i>
            </a>

            <a
              href={learnMore}
              style={{
                marginLeft: "50px",
                textDecoration: "none",
              }}
            >
              Learn More{" "}
              <i
                className="fa fa-long-arrow-right"
                aria-hidden="true"
              ></i>
            </a>
          </div>

          <div className="mt-4">
            <a href={googlePlay}>
              <img
                src="media/images/googlePlayBadge.svg"
                alt="Google Play"
                style={{ width: "140px" }}
              />
            </a>

            <a href={appStore}>
              <img
                src="media/images/appstoreBadge.svg"
                alt="App Store"
                style={{
                  width: "140px",
                  marginLeft: "30px",
                }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leftimage;