import React from "react";
import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <div className="menus">
      <ul style={{ display: "flex", listStyle: "none", gap: "25px", margin: 0, padding: 0 }}>
        <li>
          <NavLink className={({ isActive }) => (isActive ? "menu selected" : "menu")} to="/dashboard" end>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? "menu selected" : "menu")} to="/dashboard/orders">
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? "menu selected" : "menu")} to="/dashboard/holdings">
            Holdings
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? "menu selected" : "menu")} to="/dashboard/positions">
            Positions
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? "menu selected" : "menu")} to="/dashboard/funds">
            Funds
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Menu;