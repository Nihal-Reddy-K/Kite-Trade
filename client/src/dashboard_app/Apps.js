import React from "react";
import { Routes, Route } from "react-router-dom";

import TopBar from "./TopBar";
import WatchList from "./WatchList";
import Summary from "./Summary";
import Orders from "./Orders";
import Holdings from "./Holdings";
import Positions from "./Positions";
import Funds from "./Funds";

import "./index.css"; 

function Apps() {
  return (
    <div className="dashboard-app-root">
      <style>{`
        .dashboard-layout { display: flex !important; height: calc(100vh - 65px) !important; width: 100vw !important; overflow: hidden !important; }
        .watchlist-container { width: 400px !important; border-right: 1px solid #f1f3f6 !important; background: #fff !important; }
        .watchlist { list-style: none !important; padding: 0 !important; margin: 0 !important; }
        .watchlist li { list-style: none !important; padding: 15px 25px !important; border-bottom: 1px solid #f1f3f6 !important; display: block !important; }
        .dashboard-content { flex: 1 !important; padding: 40px 60px !important; overflow-y: auto !important; background: #fff !important; }
        .stock { display: flex !important; justify-content: space-between !important; align-items: center !important; width: 100% !important; }
      `}</style>
      <TopBar />
      <div className="dashboard-layout">
        <WatchList />
        <div className="dashboard-content">
          <Routes>
            <Route index element={<Summary />} />
            <Route path="orders" element={<Orders />} />
            <Route path="holdings" element={<Holdings />} />
            <Route path="positions" element={<Positions />} />
            <Route path="funds" element={<Funds />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Apps;