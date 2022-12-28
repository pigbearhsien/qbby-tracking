import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TimerSchema = Schema({
  studentId: { type: String, required: true },
  allRecord: { type: Array },
});

const exportSchema = mongoose.model("TimerRecord", TimerSchema);

export default exportSchema;
