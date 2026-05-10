const mongoose = require("mongoose");
require("dotenv").config();

const { HoldingsModel } = require("./model/HoldingsModel");

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("SUCCESS: Connected to MongoDB!");
    try {
      console.log("Testing HoldingsModel.find()...");
      const holdings = await HoldingsModel.find({}).maxTimeMS(5000); // 5 sec timeout
      console.log("Holdings found:", holdings.length);
      process.exit(0);
    } catch (e) {
      console.error("Query failed:", e);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error("FAILURE: Could not connect to MongoDB:", err.message);
    process.exit(1);
  });
