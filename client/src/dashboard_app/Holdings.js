import React, { useState, useEffect } from "react";
import axios from "axios";

function Holdings() {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/allHoldings")
      .then((res) => {
        setAllHoldings(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching holdings:", err);
        setLoading(false);
      });
  }, []);

  const totalInvestment = allHoldings.reduce((acc, stock) => acc + (stock.avg * stock.qty), 0);
  const currentValue = allHoldings.reduce((acc, stock) => acc + (stock.price * stock.qty), 0);
  const totalPnl = currentValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? (totalPnl / totalInvestment) * 100 : 0;

  if (loading) {
    return <div style={{ padding: "40px", color: "#666" }}>Loading your portfolio...</div>;
  }

  return (
    <div className="holdings-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "30px" }}>
        <div>
          <h1 className="section-title" style={{ marginBottom: "8px" }}>Holdings ({allHoldings.length})</h1>
          <p style={{ color: "#9ba6b2", fontSize: "14px" }}>Your current equity investments</p>
        </div>
        <div style={{ textAlign: "right" }}>
           <p style={{ color: "#9ba6b2", fontSize: "12px", marginBottom: "4px" }}>Total P&L</p>
           <h3 className={totalPnl >= 0 ? "profit" : "loss"} style={{ fontWeight: "700" }}>
              {totalPnl >= 0 ? '+' : ''}{totalPnl.toFixed(2)}
           </h3>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const stockCurVal = stock.price * stock.qty;
              const stockPnl = stockCurVal - (stock.avg * stock.qty);
              const isProfit = stockPnl >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.day.startsWith("+") ? "profit" : "loss";

              return (
                <tr key={index} style={{ cursor: "pointer" }}>
                  <td style={{ fontWeight: "600", color: "#333" }}>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td style={{ fontWeight: "500" }}>{stockCurVal.toFixed(2)}</td>
                  <td className={profClass} style={{ fontWeight: "600" }}>
                    {isProfit ? '+' : ''}{stockPnl.toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="summary-grid" style={{ marginTop: "40px" }}>
        <div className="summary-card" style={{ background: "#f8fafc" }}>
          <p style={{ color: "#9ba6b2", fontSize: "12px", marginBottom: "8px" }}>Total investment</p>
          <h2 style={{ fontSize: "24px" }}>{totalInvestment.toFixed(2)}</h2>
        </div>
        <div className="summary-card" style={{ background: "#f8fafc" }}>
          <p style={{ color: "#9ba6b2", fontSize: "12px", marginBottom: "8px" }}>Current value</p>
          <h2 style={{ fontSize: "24px" }}>{currentValue.toFixed(2)}</h2>
        </div>
        <div className="summary-card" style={{ background: totalPnl >= 0 ? "#f0fdf4" : "#fef2f2" }}>
          <p style={{ color: totalPnl >= 0 ? "#166534" : "#991b1b", fontSize: "12px", marginBottom: "8px" }}>Total P&L</p>
          <h2 className={totalPnl >= 0 ? "profit" : "loss"} style={{ fontSize: "24px" }}>
             {totalPnl >= 0 ? '+' : ''}{totalPnl.toFixed(2)} ({pnlPercent.toFixed(2)}%)
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Holdings;