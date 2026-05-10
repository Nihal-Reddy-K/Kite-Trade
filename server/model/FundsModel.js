const { Schema, model } = require("mongoose");

const FundsSchema = new Schema({
  balance: { type: Number, default: 100000 },
  equityMargin: { type: Number, default: 0 },
  commodityMargin: { type: Number, default: 0 },
});

module.exports = { FundsModel: model("fund", FundsSchema) };
