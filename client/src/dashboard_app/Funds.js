import React, { useState, useEffect } from "react";
import axios from "axios";

function Funds() {
  const [funds, setFunds] = useState({ balance: 0 });
  const [usedMargin, setUsedMargin] = useState(0);

  const fetchFunds = () => {
    axios.get("/funds").then(res => setFunds(res.data));
    axios.get("/summary").then(res => setUsedMargin(res.data.usedMargin));
  };

  useEffect(() => {
    fetchFunds();
  }, []);

  const handleAddFunds = () => {
    const amount = prompt("Enter amount to add:");
    if (amount && !isNaN(amount)) {
      axios.post("/addFunds", { amount }).then(() => {
        alert(`₹${amount} added successfully!`);
        fetchFunds();
      });
    }
  };

  const handleWithdrawFunds = () => {
    const amount = prompt("Enter amount to withdraw:");
    if (amount && !isNaN(amount)) {
      axios.post("/withdrawFunds", { amount })
        .then(() => {
          alert(`₹${amount} withdrawn successfully!`);
          fetchFunds();
        })
        .catch(err => alert(err.response?.data?.message || "Withdrawal failed"));
    }
  };

  return (
    <div className="funds-container">
      <div className="summary-header" style={{ marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="section-title">Funds</h1>
          <p style={{ color: "#9ba6b2", fontSize: "14px" }}>Manage your account balance and margins.</p>
        </div>
        <div style={{ display: "flex", gap: "15px" }}>
          <button className="btn-buy" onClick={handleAddFunds} style={{ padding: "12px 25px" }}>Add funds</button>
          <button className="btn-sell" onClick={handleWithdrawFunds} style={{ padding: "12px 25px" }}>Withdraw</button>
        </div>
      </div>

      <div className="summary-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
        <div className="summary-card" style={{ padding: '20px' }}>
          <p style={{ color: "#9ba6b2", fontSize: "12px", marginBottom: "8px" }}>Available margin</p>
          <h2 style={{ fontSize: "22px", color: "#387ed1" }}>₹{funds.balance.toLocaleString()}</h2>
        </div>
        <div className="summary-card" style={{ padding: '20px' }}>
          <p style={{ color: "#9ba6b2", fontSize: "12px", marginBottom: "8px" }}>Used margin</p>
          <h2 style={{ fontSize: "22px" }}>₹{usedMargin.toLocaleString()}</h2>
        </div>
        <div className="summary-card" style={{ padding: '20px' }}>
          <p style={{ color: "#9ba6b2", fontSize: "12px", marginBottom: "8px" }}>Available cash</p>
          <h2 style={{ fontSize: "22px" }}>₹{funds.balance.toLocaleString()}</h2>
        </div>
        <div className="summary-card" style={{ padding: '20px' }}>
          <p style={{ color: "#9ba6b2", fontSize: "12px", marginBottom: "8px" }}>Opening balance</p>
          <h2 style={{ fontSize: "22px" }}>₹1,00,000.00</h2>
        </div>
      </div>

      <div style={{ marginTop: "50px", padding: "40px", background: "#fcfcfd", borderRadius: "12px", border: "1px dashed #ddd", textAlign: "center" }}>
        <p style={{ color: "#9ba6b2", fontSize: "14px" }}>
          Instant funds transfer using UPI is free. Other methods may incur charges.
        </p>
      </div>
    </div>
  );
}

export default Funds;