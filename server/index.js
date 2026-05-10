require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
const { FundsModel } = require("./model/FundsModel");
const { HoldingsModel } = require("./model/HoldingsModel");
const { OrdersModel } = require("./model/OrdersModel");

const app = express();
const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/zerodha_clone";

mongoose.connect(MONGO_URL, { serverSelectionTimeoutMS: 30000 })
  .then(() => {
    console.log(">>> [DATABASE] MongoDB Connected Successfully!");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => console.error(">>> [DATABASE] Initial Connection Error:", err));

app.use(
  cors({
    // Once you deploy to Vercel, add your Vercel URL to this list:
    // e.g., ["http://localhost:3000", "https://your-app.vercel.app"]
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

const initFunds = async () => {
  try {
    const count = await FundsModel.countDocuments();
    if (count === 0) {
      await FundsModel.create({ balance: 100000 });
    }
  } catch(e) {}
};
initFunds();

app.use("/", authRoute);

app.get("/funds", async (req, res) => {
  let funds = await FundsModel.findOne();
  res.json(funds);
});

app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allOrders", async (req, res) => {
  let allOrders = await OrdersModel.find({});
  res.json(allOrders);
});

app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    const totalAmount = price * qty;
    
    let funds = await FundsModel.findOne();
    if (mode === "BUY" && (!funds || funds.balance < totalAmount)) {
      return res.status(400).json({ message: "Insufficient funds!", success: false });
    }

    let newOrder = new OrdersModel({ name, qty, price, mode });
    await newOrder.save();

    if (funds) {
      if (mode === "BUY") {
        funds.balance -= totalAmount;
      } else {
        funds.balance += totalAmount;
      }
      await funds.save();
    }

    if (mode === "BUY") {
      let holding = await HoldingsModel.findOne({ name });
      if (holding) {
        const totalCost = (holding.avg * holding.qty) + (price * qty);
        holding.qty += qty;
        holding.avg = totalCost / holding.qty;
        await holding.save();
      } else {
        await HoldingsModel.create({
          name, qty, avg: price, price: price, net: "+0.00%", day: "+0.00%",
        });
      }
    } else if (mode === "SELL") {
      let holding = await HoldingsModel.findOne({ name });
      if (holding) {
        holding.qty -= qty;
        if (holding.qty <= 0) {
          await HoldingsModel.deleteOne({ name });
        } else {
          await holding.save();
        }
      }
    }

    res.status(201).json({ message: "Order processed successfully!", success: true });
  } catch (error) {
    console.error("NEW ORDER ERROR:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
});

app.get("/summary", async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({});
    const funds = await FundsModel.findOne();
    let totalInvestment = 0;
    let currentValue = 0;

    holdings.forEach(h => {
      totalInvestment += (h.avg * h.qty);
      currentValue += (h.price * h.qty);
    });

    const pnl = currentValue - totalInvestment;
    const pnlPercent = totalInvestment > 0 ? (pnl / totalInvestment) * 100 : 0;

    res.json({
      totalInvestment,
      currentValue,
      pnl,
      pnlPercent: pnlPercent.toFixed(2),
      holdingsCount: holdings.length,
      balance: funds ? funds.balance : 0,
      usedMargin: totalInvestment // Used margin is the capital tied up in holdings
    });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

app.post("/addFunds", async (req, res) => {
  try {
    const { amount } = req.body;
    let funds = await FundsModel.findOne();
    if (funds) {
      funds.balance += Number(amount);
      await funds.save();
      res.json({ success: true, balance: funds.balance });
    } else {
      res.status(404).json({ success: false });
    }
  } catch (e) { res.status(500).json({ success: false }); }
});

app.post("/withdrawFunds", async (req, res) => {
  try {
    const { amount } = req.body;
    let funds = await FundsModel.findOne();
    if (funds && funds.balance >= amount) {
      funds.balance -= Number(amount);
      await funds.save();
      res.json({ success: true, balance: funds.balance });
    } else {
      res.status(400).json({ success: false, message: "Insufficient balance" });
    }
  } catch (e) { res.status(500).json({ success: false }); }
});

app.get("/marketData/:symbol", async (req, res) => {
  const symbol = req.params.symbol;
  const apiKey = process.env.ALPHA_VANTAGE_KEY;

  const basePrices = {
    "INFY": 1555.45,
    "ONGC": 279.25,
    "TCS": 3194.80,
    "KPITTECH": 266.45,
    "WIPRO": 577.75,
  };

  const getSimulatedPrice = (base) => {
    const change = (Math.random() * 0.2 - 0.1); // +/- 0.1%
    return base + (base * change / 100);
  };

  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}.BSE&apikey=${apiKey}`
    );
    const data = response.data["Global Quote"];
    let price, change, percentChange;

    if (data && data["05. price"]) {
      price = getSimulatedPrice(parseFloat(data["05. price"]));
      change = data["09. change"];
      percentChange = data["10. change percent"];
    } else {
      price = getSimulatedPrice(basePrices[symbol] || 100);
      change = (price * 0.01).toFixed(2);
      percentChange = "0.01%";
    }

    // Sync holding price for summary accuracy
    await HoldingsModel.updateOne({ name: symbol }, { $set: { price: price } });

    res.json({ price, change, percentChange });
  } catch (error) {
    const price = getSimulatedPrice(basePrices[symbol] || 100);
    res.json({ price, change: "0.00", percentChange: "0.00%" });
  }
});
