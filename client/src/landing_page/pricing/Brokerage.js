import React from "react";

function Brokerage() {
  return (
    <div className="container mt-5">
      
      <ul className="nav nav-tabs fs-3" id="brokerageTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="equity-tab"
            data-bs-toggle="tab"
            data-bs-target="#equity"
            type="button"
          >
            Equity
          </button>
        </li>

        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="currency-tab"
            data-bs-toggle="tab"
            data-bs-target="#currency"
            type="button"
          >
            Currency
          </button>
        </li>

        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="commodity-tab"
            data-bs-toggle="tab"
            data-bs-target="#commodity"
            type="button"
          >
            Commodity
          </button>
        </li>
      </ul>

      <div className="tab-content mt-4">
        <div className="tab-pane fade show active" id="equity">
          <table className="table table-bordered mb-5">
            <thead>
              <tr>
                <th></th>
                <th>Equity delivery</th>
                <th>Equity intraday</th>
                <th>F&O - Futures</th>
                <th>F&O - Options</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Brokerage</td>
                <td>Zero Brokerage</td>
                <td>0.03% or Rs. 20/executed order whichever is lower</td>
                <td>0.03% or Rs. 20/executed order whichever is lower</td>
                <td>Flat Rs. 20 per executed order</td>
              </tr>

              <tr>
                <td>STT/CTT</td>
                <td>0.1% on buy & sell</td>
                <td>0.025% on the sell side</td>
                <td>0.02% on the sell side</td>
                <td>0.125% of intrinsic value</td>
              </tr>

              <tr>
                <td>Transaction charges</td>
                <td>NSE: 0.00322%</td>
                <td>NSE: 0.00322%</td>
                <td>NSE: 0.00188%</td>
                <td>NSE: 0.03503%</td>
              </tr>

              <tr>
                <td>GST</td>
                <td>18% on brokerage + transaction charges</td>
                <td>18% on brokerage + transaction charges</td>
                <td>18% on brokerage + transaction charges</td>
                <td>18% on brokerage + transaction charges</td>
              </tr>

              <tr>
                <td>SEBI charges</td>
                <td>₹10 / crore</td>
                <td>₹10 / crore</td>
                <td>₹10 / crore</td>
                <td>₹10 / crore</td>
              </tr>

              <tr>
                <td>Stamp charges</td>
                <td>0.015% or ₹1500 / crore on buy side</td>
                <td>0.003% or ₹300 / crore on buy side</td>
                <td>0.002% or ₹200 / crore on buy side</td>
                <td>0.003% or ₹300 / crore on buy side</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="tab-pane fade" id="currency">
          <table className="table table-bordered mb-5">
            <thead>
              <tr>
                <th></th>
                <th>Currency futures</th>
                <th>Currency options</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Brokerage</td>
                <td>0.03% or ₹20/executed order whichever is lower</td>
                <td>₹20/executed order</td>
              </tr>

              <tr>
                <td>STT/CTT</td>
                <td>No STT</td>
                <td>No STT</td>
              </tr>

              <tr>
                <td>Transaction charges</td>
                <td>
                  NSE: 0.00035%
                  <br />
                  BSE: 0.00045%
                </td>

                <td>
                  NSE: 0.0311%
                  <br />
                  BSE: 0.001%
                </td>
              </tr>

              <tr>
                <td>GST</td>
                <td>18% on (brokerage + SEBI charges + transaction charges)</td>

                <td>18% on (brokerage + SEBI charges + transaction charges)</td>
              </tr>

              <tr>
                <td>SEBI charges</td>
                <td>₹10 / crore</td>
                <td>₹10 / crore</td>
              </tr>

              <tr>
                <td>Stamp charges</td>
                <td>0.0001% or ₹10 / crore on buy side</td>
                <td>0.0001% or ₹10 / crore on buy side</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="tab-pane fade" id="commodity">
          <table className="table table-bordered mb-5">
            <thead>
              <tr>
                <th></th>
                <th>Commodity futures</th>
                <th>Commodity options</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Brokerage</td>
                <td>0.03% or Rs. 20/executed order whichever is lower</td>
                <td>₹20/executed order</td>
              </tr>

              <tr>
                <td>STT/CTT</td>
                <td>0.01% on sell side</td>
                <td>0.05% on sell side</td>
              </tr>

              <tr>
                <td>Transaction charges</td>

                <td>
                  MCX: 0.0021%
                  <br />
                  NSE: 0.0001%
                </td>

                <td>
                  MCX: 0.0418%
                  <br />
                  NSE: 0.001%
                </td>
              </tr>

              <tr>
                <td>GST</td>

                <td>18% on (brokerage + SEBI charges + transaction charges)</td>

                <td>18% on (brokerage + SEBI charges + transaction charges)</td>
              </tr>

              <tr>
                <td>SEBI charges</td>

                <td>
                  Agri:
                  <br />
                  ₹1 / crore
                  <br />
                  Non-agri:
                  <br />
                  ₹10 / crore
                </td>

                <td>₹10 / crore</td>
              </tr>

              <tr>
                <td>Stamp charges</td>
                <td>0.002% or ₹200 / crore on buy side</td>
                <td>0.003% or ₹300 / crore on buy side</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center py-5">
        <h2 className="fs-2 fw-normal">
          <a href="" className="text-decoration-none">
            Calculate your costs upfront
          </a>{" "}
          using our brokerage calculator
        </h2>
      </div>

      <div className="py-4">
        <h1 className="display-6 fw-normal mb-4">
          Charges for account opening
        </h1>

        <table className="table table-bordered mb-5">
          <thead>
            <tr>
              <th>Type of account</th>
              <th>Charges</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Online account</td>

              <td>
                <span className="badge bg-success px-3 py-2">FREE</span>
              </td>
            </tr>

            <tr>
              <td>Offline account</td>

              <td>
                <span className="badge bg-success px-3 py-2">FREE</span>
              </td>
            </tr>

            <tr>
              <td>NRI account (offline only)</td>
              <td>₹ 500</td>
            </tr>

            <tr>
              <td>
                Partnership, LLP, HUF, or Corporate accounts (offline only)
              </td>

              <td>₹ 500</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="py-5">
        <h1 className="display-6 fw-normal mb-4">
          Demat AMC (Annual Maintenance Charge)
        </h1>

        <table className="table table-bordered mb-4">
          <thead>
            <tr>
              <th>Value of holdings</th>
              <th>AMC</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Up to ₹4 lakh</td>

              <td>
                <span className="badge bg-success px-3 py-2">FREE</span>
              </td>
            </tr>

            <tr>
              <td>₹4 lakh - ₹10 lakh</td>
              <td>₹100 per year, charged quarterly*</td>
            </tr>

            <tr>
              <td>Above ₹10 lakh</td>
              <td>₹300 per year, charged quarterly</td>
            </tr>
          </tbody>
        </table>

        <p className="small text-muted mt-3">
          * Lower AMC is applicable only if the account qualifies as a Basic
          Services Demat Account (BSDA). BSDA account holders cannot hold more
          than one demat account. To learn more about BSDA,{" "}
          <a href="" className="text-decoration-none">
            click here.
          </a>
        </p>
      </div>

      <div className="py-5">
        <h1 className="display-6 fw-normal mb-4">
          Charges for optional value added services
        </h1>

        <table className="table table-bordered mb-5">
          <thead>
            <tr>
              <th>Service</th>
              <th>Billing Frequency</th>
              <th>Charges</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Tickertape</td>
              <td>Monthly / Annual</td>
              <td>Free: 0 | Pro: 249/2399</td>
            </tr>

            <tr>
              <td>Smallcase</td>
              <td>Per transaction</td>
              <td>Buy & Invest More: 100 | SIP: 10</td>
            </tr>

            <tr>
              <td>Kite Connect</td>
              <td>Monthly</td>
              <td>Connect: 500 | Personal: Free</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="py-5">
        <h1 className="display-6 fw-normal mb-5">Charges explained</h1>

        <div className="row">
          <div className="col-6">
            <div className="mb-5">
              <h3 className="fs-3 mb-4">
                Securities/Commodities transaction tax
              </h3>

              <p className="text-muted lh-lg">
                Tax by the government when transacting on the exchanges. Charged
                as above on both buy and sell sides when trading equity
                delivery. Charged only on selling side when trading intraday or
                on F&O.
              </p>
            </div>

            <div className="mb-5">
              <h3 className="fs-3 mb-4">Transaction/Turnover Charges</h3>

              <p className="text-muted lh-lg">
                Charged by exchanges (NSE, BSE, MCX) on the value of your
                transactions.
              </p>
            </div>

            <div className="mb-5">
              <h3 className="fs-3 mb-4">Call & trade</h3>

              <p className="text-muted lh-lg">
                Additional charges of ₹50 per order for orders placed through a
                dealer at Zerodha including auto square off orders.
              </p>
            </div>
          </div>

          <div className="col-6">
            <div className="mb-5">
              <h3 className="fs-3 mb-4">GST</h3>

              <p className="text-muted lh-lg">
                Tax levied by the government on the services rendered. 18% of
                (brokerage + SEBI charges + transaction charges)
              </p>
            </div>

            <div className="mb-5">
              <h3 className="fs-3 mb-4">DP (Depository participant) charges</h3>

              <p className="text-muted lh-lg">
                ₹15.34 per scrip is charged on the trading account ledger when
                stocks are sold, irrespective of quantity.
              </p>
            </div>

            <div className="mb-5">
              <h3 className="fs-3 mb-4">AMC (Account maintenance charges)</h3>

              <p className="text-muted lh-lg">
                For BSDA demat account: Zero charges if the holding value is
                less than ₹4,00,000.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;
