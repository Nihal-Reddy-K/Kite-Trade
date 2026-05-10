import React, { useState, useEffect } from "react";
import axios from "axios";

function Positions() {
  const [activePositions, setActivePositions] = useState([]);

  useEffect(() => {
    axios.get("/allOrders").then(res => {
      // Mocking "active positions" as all unique instruments bought/sold today
      setActivePositions(res.data);
    });
  }, []);

  return (
    <div className="positions-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "30px" }}>
        <div>
          <h1 className="section-title" style={{ marginBottom: "8px" }}>Positions ({activePositions.length})</h1>
          <p style={{ color: "#9ba6b2", fontSize: "14px" }}>Your active intraday and F&O positions</p>
        </div>
      </div>
      
      {activePositions.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg.</th>
                <th>LTP</th>
                <th>P&L</th>
                <th>Chg.</th>
              </tr>
            </thead>
            <tbody>
              {activePositions.map((pos, index) => (
                <tr key={index}>
                  <td style={{ fontSize: "11px", fontWeight: "700", color: "#666" }}>MIS</td>
                  <td style={{ fontWeight: "600" }}>{pos.name}</td>
                  <td style={{ color: pos.mode === "BUY" ? "var(--success)" : "var(--danger)" }}>
                    {pos.mode === "BUY" ? "+" : "-"}{pos.qty}
                  </td>
                  <td>{pos.price.toFixed(2)}</td>
                  <td>{pos.price.toFixed(2)}</td>
                  <td className="profit">0.00</td>
                  <td className="profit">0.00%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="table-container" style={{ textAlign: "center", padding: "100px", background: "#fff" }}>
           <img src="https://zerodha.com/static/images/empty-positions.svg" alt="Empty" style={{ width: "120px", marginBottom: "20px", opacity: 0.5 }} />
           <p style={{ color: "#9ba6b2", fontSize: "14px" }}>You don't have any open positions.</p>
        </div>
      )}
    </div>
  );
}

export default Positions;