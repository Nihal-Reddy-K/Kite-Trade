import React from "react";

import WatchList from "./WatchList";
import Summary from "./Summary";
import Holdings from "./Holdings";

function Dashboard() {
  return (
    <div className="dashboard-layout">

      <WatchList />

      <div className="dashboard-content">

        <Summary />
        <Holdings />

      </div>

    </div>
  );
}

export default Dashboard;