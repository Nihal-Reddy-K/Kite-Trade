import React, { useState, useEffect } from "react";
import { KeyboardArrowUp, KeyboardArrowDown, BarChartOutlined } from "@mui/icons-material";
import { Tooltip, Grow } from "@mui/material";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";
import axios from "axios";

const initialWatchlist = [
  { name: "INFY", price: 1555.45, percent: "-1.60%", isUp: false },
  { name: "ONGC", price: 116.8, percent: "0.09%", isUp: true },
  { name: "TCS", price: 3194.8, percent: "0.21%", isUp: true },
  { name: "KPITTECH", price: 266.45, percent: "3.54%", isUp: true },
  { name: "WIPRO", price: 577.75, percent: "0.32%", isUp: true },
  { name: "RELIANCE", price: 2450.00, percent: "1.20%", isUp: true },
  { name: "HDFC", price: 1620.00, percent: "-0.40%", isUp: false },
  { name: "SBIN", price: 580.00, percent: "0.85%", isUp: true },
  { name: "ICICIBANK", price: 940.00, percent: "2.10%", isUp: true },
  { name: "BHARTIARTL", price: 890.00, percent: "-0.15%", isUp: false },
];

function WatchList() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredStocks = initialWatchlist.filter(stock => 
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search eg: infy, bse, nifty fut"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="counts" style={{ fontSize: "11px", color: "#9ba6b2", marginLeft: "10px", fontWeight: "500" }}> 
          {filteredStocks.length} / {initialWatchlist.length}
        </span>
      </div>

      <ul className="watchlist">
        {filteredStocks.map((stock) => (
          <WatchListItem stock={stock} key={stock.name} />
        ))}
      </ul>
    </div>
  );
}

const WatchListItem = ({ stock }) => {
  const [showActions, setShowActions] = useState(false);
  const [showBuyWindow, setShowBuyWindow] = useState(false);
  const [showSellWindow, setShowSellWindow] = useState(false);
  
  const [liveData, setLiveData] = useState({
    price: stock.price,
    percent: stock.percent,
    isUp: stock.isUp
  });

  useEffect(() => {
    const fetchPrice = () => {
      axios.get(`/marketData/${stock.name}`)
        .then(res => {
          setLiveData({
            price: res.data.price || stock.price,
            percent: res.data.percentChange || stock.percent,
            isUp: res.data.change ? parseFloat(res.data.change) >= 0 : stock.isUp
          });
        })
        .catch(err => console.log("API Limit or Error for", stock.name));
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 5000);
    return () => clearInterval(interval);
  }, [stock.name]);

  const handleMouseEnter = () => setShowActions(true);
  const handleMouseLeave = () => {
    if (!showBuyWindow && !showSellWindow) {
      setShowActions(false);
    }
  };

  return (
    <li 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative' }}
    >
      <div className="stock">
        <div className="stock-left">
          <span className={liveData.isUp ? "profit" : "loss"} style={{ fontWeight: "500" }}>{stock.name}</span>
        </div>
        <div className="stock-right">
          <span className="percent" style={{ color: "#9ba6b2" }}>{liveData.percent}</span>
          {liveData.isUp ? (
            <KeyboardArrowUp style={{ fontSize: "18px", color: "var(--success)" }} />
          ) : (
            <KeyboardArrowDown style={{ fontSize: "18px", color: "var(--danger)" }} />
          )}
          <span className="stock-price" style={{ fontWeight: "600", minWidth: "60px", textAlign: "right" }}>
            {liveData.price.toFixed(2)}
          </span>
        </div>
      </div>
      
      {showActions && (
        <span className="actions" style={{ 
          position: 'absolute', 
          right: '10px', 
          top: '0', 
          bottom: '0', 
          display: 'flex', 
          alignItems: 'center', 
          background: 'white',
          paddingLeft: '15px',
          boxShadow: '-10px 0 10px white'
        }}>
          <span style={{ display: 'flex', gap: '4px' }}>
            <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
              <button className="btn-buy" onClick={() => setShowBuyWindow(true)} style={{ padding: '4px 12px' }}>B</button>
            </Tooltip>
            <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
              <button className="btn-sell" onClick={() => setShowSellWindow(true)} style={{ padding: '4px 12px' }}>S</button>
            </Tooltip>
            <Tooltip title="Analytics (A)" placement="top" arrow TransitionComponent={Grow}>
              <button className="action" style={{ background: 'none', border: '1px solid #eee', padding: '4px', borderRadius: '4px' }}>
                <BarChartOutlined style={{ fontSize: '18px', color: '#666' }} />
              </button>
            </Tooltip>
          </span>
        </span>
      )}

      {showBuyWindow && (
        <BuyActionWindow 
          name={stock.name} 
          price={liveData.price} 
          closeWindow={() => { setShowBuyWindow(false); setShowActions(false); }} 
        />
      )}
      {showSellWindow && (
        <SellActionWindow 
          name={stock.name} 
          price={liveData.price} 
          closeWindow={() => { setShowSellWindow(false); setShowActions(false); }} 
        />
      )}
    </li>
  );
};

export default WatchList;