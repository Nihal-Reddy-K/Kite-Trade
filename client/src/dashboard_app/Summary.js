import React, { useState, useEffect } from "react";
import axios from "axios";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Mon', value: 98000 },
  { name: 'Tue', value: 99500 },
  { name: 'Wed', value: 97800 },
  { name: 'Thu', value: 102000 },
  { name: 'Fri', value: 101500 },
  { name: 'Sat', value: 104000 },
  { name: 'Sun', value: 105266 },
];

function Summary() {
  const [summary, setSummary] = useState({
    totalInvestment: 0,
    currentValue: 0,
    pnl: 0,
    pnlPercent: 0,
    holdingsCount: 0,
    balance: 0,
    usedMargin: 0
  });

  useEffect(() => {
    const fetchSummary = () => {
      axios.get("/summary", { withCredentials: true })
        .then(res => {
          if (res.data) setSummary(res.data);
        })
        .catch(err => console.error("Summary fetch error", err));
    };

    fetchSummary();
    const interval = setInterval(fetchSummary, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="summary-container" style={{ width: "100%" }}>
      <div className="summary-header" style={{ marginBottom: "40px" }}>
        <h1 className="section-title" style={{ fontSize: "28px", marginBottom: "8px", color: "#333" }}>Hi, User!</h1>
        <p style={{ color: "#9ba6b2", fontSize: "14px" }}>Here's what's happening with your account today.</p>
      </div>

      <div className="summary-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px", marginBottom: "40px" }}>
        <div className="summary-card">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <div style={{ padding: "8px", background: "#f0f4ff", borderRadius: "8px", color: "#387ed1" }}>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
            </div>
            <span style={{ fontWeight: "600", fontSize: "15px", color: "#666" }}>Equity</span>
          </div>
          <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "15px" }}>
             ₹{summary.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h2>
          <div style={{ borderTop: "1px solid #f1f3f6", paddingTop: "15px", display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
             <span style={{ color: "#9ba6b2" }}>Available Cash</span>
             <span style={{ fontWeight: "600" }}>₹{summary.balance.toLocaleString()}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginTop: "8px" }}>
             <span style={{ color: "#9ba6b2" }}>Used Margin</span>
             <span style={{ fontWeight: "600" }}>₹{summary.usedMargin.toLocaleString()}</span>
          </div>
        </div>

        <div className="summary-card">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <div style={{ padding: "8px", background: "#fff7ed", borderRadius: "8px", color: "#f97316" }}>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></svg>
            </div>
            <span style={{ fontWeight: "600", fontSize: "15px", color: "#666" }}>Commodity</span>
          </div>
          <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "15px" }}>0.00</h2>
          <div style={{ borderTop: "1px solid #f1f3f6", paddingTop: "15px", display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
             <span style={{ color: "#9ba6b2" }}>Used Margin</span>
             <span style={{ fontWeight: "600" }}>₹0.00</span>
          </div>
        </div>
      </div>

      <div className="holdings-preview">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
          <h4 style={{ fontSize: "18px", fontWeight: "600" }}>Portfolio Performance</h4>
          <h2 className={summary.pnl >= 0 ? "profit" : "loss"} style={{ fontSize: "24px", fontWeight: "700" }}>
             {summary.pnl >= 0 ? '+' : ''}{summary.pnl.toFixed(2)} ({summary.pnlPercent}%)
          </h2>
        </div>
        
        <div className="summary-card" style={{ height: "300px", padding: "20px 10px 10px 0" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#387ed1" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#387ed1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f3f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ba6b2' }} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                itemStyle={{ color: '#387ed1', fontWeight: '600' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#387ed1" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Summary;