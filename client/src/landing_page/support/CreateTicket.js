import React from "react";
import {
  FaUserPlus,
  FaUserCheck,
  FaChartLine,
  FaMoneyBillWave,
  FaCube,
  FaKey,
} from "react-icons/fa";

function CreateTicket() {
  return (
    <div className="container py-5">
      <h1
        className="mb-5"
        style={{
          fontSize: "2.2rem",
          color: "#424242",
        }}
      >
        To create a ticket, select a relevant topic
      </h1>

      <div className="row gy-5">
        <div className="col-lg-4">
          <div className="flex items-center gap-3 mb-4">
            <FaUserPlus size={22} className="text-gray-600" />

            <h3 className="text-2xl font-normal m-0">Account Opening</h3>
          </div>

          <div className="flex flex-col gap-3 text-base">
            <a href="" className="text-decoration-none">
              Resident individual
            </a>

            <a href="" className="text-decoration-none">
              Minor
            </a>

            <a href="" className="text-decoration-none">
              Non Resident Indian (NRI)
            </a>

            <a href="" className="text-decoration-none">
              Company, Partnership, HUF and LLP
            </a>

            <a href="" className="text-decoration-none">
              Glossary
            </a>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="flex items-center gap-3 mb-4">
            <FaUserCheck size={22} className="text-gray-600" />

            <h3 className="text-2xl font-normal m-0">Your Zerodha Account</h3>
          </div>

          <div className="flex flex-col gap-3">
            <a href="" className="text-decoration-none">
              Your Profile
            </a>

            <a href="" className="text-decoration-none">
              Account modification
            </a>

            <a href="" className="text-decoration-none">
              Client Master Report (CMR)
            </a>

            <a href="" className="text-decoration-none">
              Nomination
            </a>

            <a href="" className="text-decoration-none">
              Transfer and conversion of securities
            </a>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="flex items-center gap-3 mb-4">
            <FaChartLine size={22} className="text-gray-600" />

            <h3 className="text-2xl font-normal m-0">Kite</h3>
          </div>

          <div className="flex flex-col gap-3">
            <a href="" className="text-decoration-none">
              IPO
            </a>

            <a href="" className="text-decoration-none">
              Trading FAQs
            </a>

            <a href="" className="text-decoration-none">
              Margin Trading Facility (MTF)
            </a>

            <a href="" className="text-decoration-none">
              Charts and orders
            </a>

            <a href="" className="text-decoration-none">
              Alerts and Nudges
            </a>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="flex items-center gap-3 mb-4">
            <FaMoneyBillWave size={22} className="text-gray-600" />

            <h3 className="text-2xl font-normal m-0">Funds</h3>
          </div>

          <div className="flex flex-col gap-3">
            <a href="" className="text-decoration-none">
              Add money
            </a>

            <a href="" className="text-decoration-none">
              Withdraw money
            </a>

            <a href="" className="text-decoration-none">
              Add bank accounts
            </a>

            <a href="" className="text-decoration-none">
              eMandates
            </a>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="flex items-center gap-3 mb-4">
            <FaCube size={22} className="text-gray-600" />
            <h3 className="text-2xl font-normal m-0">Console</h3>
          </div>
          <div className="flex flex-col gap-3">
            <a href="" className="text-decoration-none">
              Portfolio
            </a>
            <a href="" className="text-decoration-none">
              Corporate actions
            </a>
            <a href="" className="text-decoration-none">
              Reports
            </a>
            <a href="" className="text-decoration-none">
              Segments
            </a>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="flex items-center gap-3 mb-4">
            <FaKey size={22} className="text-gray-600" />

            <h3 className="text-2xl font-normal m-0">Coin</h3>
          </div>

          <div className="flex flex-col gap-3">
            <a href="" className="text-decoration-none">
              Mutual funds
            </a>

            <a href="" className="text-decoration-none">
              SIPs
            </a>

            <a href="" className="text-decoration-none">
              Coin app
            </a>

            <a href="" className="text-decoration-none">
              Redemption
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
