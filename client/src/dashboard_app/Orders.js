import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Orders() {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/allOrders").then((res) => {
      setAllOrders(res.data.reverse()); // Show newest first
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div style={{ padding: "40px", color: "#666" }}>Loading orders...</div>;
  }

  return (
    <div className="orders-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "30px" }}>
        <div>
          <h1 className="section-title" style={{ marginBottom: "8px" }}>Orders ({allOrders.length})</h1>
          <p style={{ color: "#9ba6b2", fontSize: "14px" }}>Your transaction history for today</p>
        </div>
      </div>

      {allOrders.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Type</th>
                <th>Instrument</th>
                <th>Product</th>
                <th>Qty.</th>
                <th>Avg. Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order, index) => (
                <tr key={index}>
                  <td style={{ color: "#9ba6b2" }}>10:15 AM</td>
                  <td>
                    <span style={{ 
                      padding: "2px 8px", 
                      borderRadius: "4px", 
                      fontSize: "11px", 
                      fontWeight: "700",
                      background: order.mode === "BUY" ? "#eef2ff" : "#fef2f2",
                      color: order.mode === "BUY" ? "#387ed1" : "#f44336" 
                    }}>
                      {order.mode}
                    </span>
                  </td>
                  <td style={{ fontWeight: "600" }}>{order.name}</td>
                  <td>CNC</td>
                  <td>{order.qty}</td>
                  <td>{order.price.toFixed(2)}</td>
                  <td>
                    <span style={{ color: "#4caf50", fontSize: "12px", fontWeight: "600" }}>● COMPLETE</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="table-container" style={{ textAlign: "center", padding: "100px", background: "#fff" }}>
           <img src="https://zerodha.com/static/images/empty-orders.svg" alt="Empty" style={{ width: "120px", marginBottom: "20px", opacity: 0.5 }} />
           <p style={{ color: "#9ba6b2", fontSize: "14px", marginBottom: "20px" }}>You haven't placed any orders today</p>
           <Link to="/dashboard" className="btn-buy" style={{ textDecoration: "none", padding: "12px 24px" }}>
             Get started
           </Link>
        </div>
      )}
    </div>
  );
}

export default Orders;