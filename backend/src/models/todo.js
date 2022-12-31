import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TodoSchema = Schema({
  studentId: { type: String, required: true },
  event: { type: String, required: true },
  status: { type: String },
});

const exportSchema = mongoose.model("Todo", TodoSchema);

export default exportSchema;
