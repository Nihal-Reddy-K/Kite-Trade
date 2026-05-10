const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

console.log("Attempting to connect to:", MONGO_URL.replace(/:([^@]+)@/, ":****@")); // Mask password

mongoose.connect(MONGO_URL)
  .then(async () => {
    console.log("SUCCESS: Connected to MongoDB!");
    try {
      console.log("Testing a query...");
      // Try to ping the database or run a command
      await mongoose.connection.db.admin().ping();
      console.log("Ping successful! Database is fully reachable.");
      process.exit(0);
    } catch (e) {
      console.error("Ping failed:", e);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error("FAILURE: Could not connect to MongoDB.");
    console.error("Error Message:", err.message);
    process.exit(1);
  });
