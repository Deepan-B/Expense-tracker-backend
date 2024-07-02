import mongoose from "mongoose";

const { Schema } = mongoose;

const expenseSchema = new mongoose.Schema({
  expenseName: String,
  expenseCategory: String,
  amount: Number,
  expenseDate: Date,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

expenseSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
