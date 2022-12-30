import mongoose from "mongoose";

const Schema = mongoose.Schema;

const InfoSchema = Schema({
  username: { type: String, required: true },
  studentId: { type: String, required: true },
  password: { type: String, required: true },
  experience: { type: Number },
  money: { type: Number },
  timerRecords: { type: Array },
});

const exportSchema = mongoose.model("UserInfo", InfoSchema);

export default exportSchema;
