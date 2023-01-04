import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const MarketSchema = Schema({
  studentId: { type: String, required: true },
  type: { type: String, required: true },
  item: { type: String, required: true },
  status: { type: String },
});

const exportSchema = mongoose.model("Market", MarketSchema);

export default exportSchema;
