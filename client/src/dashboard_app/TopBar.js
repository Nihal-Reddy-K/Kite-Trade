import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function TopBar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState("User");

  useEffect(() => {
    axios.get("/user", { withCredentials: true })
      .then(res => {
        if (res.data.status) setUsername(res.data.user);
      })
      .catch(err => console.log(err));
  }, []);

  const [indices, setIndices] = useState({
    nifty: { price: 24821.10, percent: -1.60 },
    sensex: { price: 81224.75, percent: -1.65 }
  });

  useEffect(() => {
    const simulateIndices = setInterval(() => {
      setIndices(prev => ({
        nifty: {
          price: prev.nifty.price + (Math.random() * 4 - 2),
          percent: prev.nifty.percent + (Math.random() * 0.02 - 0.01)
        },
        sensex: {
          price: prev.sensex.price + (Math.random() * 10 - 5),
          percent: prev.sensex.percent + (Math.random() * 0.02 - 0.01)
        }
      }));
    }, 5000);
    return () => clearInterval(simulateIndices);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/logout", { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <Link to="/dashboard">
          <img
            src="/media/images/logo.svg"
            alt="logo"
            style={{ height: "18px", marginRight: "20px" }}
          />
        </Link>
        <div className="market-indices">
          <div className="index-item">
            <span className="index-name">NIFTY 50</span>
            <span className={indices.nifty.percent >= 0 ? "profit" : "loss"}>{indices.nifty.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className="percent-loss" style={{ color: indices.nifty.percent >= 0 ? 'var(--success)' : 'var(--danger)' }}>{indices.nifty.percent.toFixed(2)}%</span>
          </div>
          <div className="index-item" style={{ marginLeft: '20px' }}>
            <span className="index-name">SENSEX</span>
            <span className={indices.sensex.percent >= 0 ? "profit" : "loss"}>{indices.sensex.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className="percent-loss" style={{ color: indices.sensex.percent >= 0 ? 'var(--success)' : 'var(--danger)' }}>{indices.sensex.percent.toFixed(2)}%</span>
          </div>
        </div>
      </div>

      <div className="topbar-right">
        <Menu />
        <div className="divider"></div>
        <div className="profile-dropdown-container" style={{ position: 'relative' }}>
          <div 
            className="profile-trigger" 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <AccountCircleIcon className="user-icon" />
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#666', marginLeft: '5px' }}>{username}</span>
          </div>
          {isDropdownOpen && (
            <div className="profile-dropdown-menu">
              <div className="dropdown-header">
                <strong>{username}</strong>
                <span>nihal.reddy@example.com</span>
              </div>
              <div onClick={handleLogout} className="dropdown-item logout">Logout</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopBar;