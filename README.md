# Kite-Trade: Full-Stack Trading Dashboard

A high-performance trading dashboard inspired by Zerodha's Kite, built using the MERN Stack (MongoDB, Express, React, Node.js). This project features real-time price simulation, secure authentication, and interactive portfolio data visualization.

## Live Application
- Frontend: https://kite-frontend-6kvb.onrender.com
- Backend API: Hosted on Render

## Key Features
- Secure Authentication: User signup and login with password salting (Bcrypt) and JWT-based session management.
- Live Market Engine: A server-side simulation engine that provides real-time price updates for stocks and indices (NIFTY/SENSEX).
- Interactive Analytics: Professional portfolio performance charts built with Recharts.
- Trading Operations: Functional Buy/Sell mechanics that update holdings and funds in real-time.
- Fund Management: Functional Add/Withdrawal system with margin calculation logic.

## Technology Stack
- Frontend: React.js, React Router, Axios, Material UI, Recharts, Bootstrap
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Testing: Jest

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Nihal-Reddy-K/Kite-Trade.git
   cd Kite-Trade
   ```

2. Configure and start the backend:
   ```bash
   cd server
   npm install
   # Create a .env file with your MONGO_URL, TOKEN_KEY, and ALPHA_VANTAGE_KEY
   npm start
   ```

3. Configure and start the frontend:
   ```bash
   cd ../client
   npm install
   npm start
   ```

## Testing
Run unit tests for core financial logic:
```bash
cd client
npm test
```
