import React, { useState, useEffect } from "react";
import axios from "axios";

function SellActionWindow({ name, price, closeWindow }) {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(price);

  const handleSellClick = () => {
    axios
      .post("/newOrder", {
        name: name,
        qty: stockQuantity,
        price: stockPrice,
        mode: "SELL",
      })
      .then(() => {
        alert("Sell Order Placed Successfully!");
        closeWindow();
      })
      .catch((err) => {
        alert("Failed to place order: " + (err.response?.data?.message || err.message));
      });
  };

  return (
    <div className="modal-backdrop-custom" style={{ 
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
      background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 
    }}>
      <div className="modal-window" style={{ 
        background: '#fff', width: '400px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' 
      }}>
        <div style={{ background: '#f44336', color: '#fff', padding: '15px 20px', display: 'flex', justifyContent: 'space-between' }}>
           <span style={{ fontWeight: '600' }}>Sell {name} x {stockQuantity} Qty</span>
           <span style={{ fontSize: '12px', opacity: 0.8 }}>NSE: ₹{price.toFixed(2)}</span>
        </div>
        
        <div style={{ padding: '25px' }}>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
              <div>
                 <label style={{ display: 'block', fontSize: '12px', color: '#9ba6b2', marginBottom: '8px' }}>Qty</label>
                 <input
                   type="number"
                   value={stockQuantity}
                   onChange={(e) => setStockQuantity(Number(e.target.value))}
                   style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
                 />
              </div>
              <div>
                 <label style={{ display: 'block', fontSize: '12px', color: '#9ba6b2', marginBottom: '8px' }}>Price</label>
                 <input
                   type="number"
                   step="0.05"
                   value={stockPrice}
                   onChange={(e) => setStockPrice(Number(e.target.value))}
                   style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
                 />
              </div>
           </div>

           <div style={{ padding: '15px', background: '#fef2f2', borderRadius: '6px', marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                 <span style={{ color: '#9ba6b2' }}>Credit will be</span>
                 <span style={{ fontWeight: '600', color: '#f44336' }}>₹{(stockQuantity * stockPrice).toLocaleString()}</span>
              </div>
           </div>

           <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleSellClick} style={{ 
                flex: 1, background: '#f44336', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: '600', cursor: 'pointer' 
              }}>Sell</button>
              <button onClick={closeWindow} style={{ 
                flex: 1, background: '#fff', color: '#444', border: '1px solid #ddd', padding: '12px', borderRadius: '4px', fontWeight: '600', cursor: 'pointer' 
              }}>Cancel</button>
           </div>
        </div>
      </div>
    </div>
  );
}

export default SellActionWindow;