import express from "express";
import {
  addExpense,
  editExpense,
  removeExpense,
  getAllExpenses,
  getExpensesByCategory,
  getExpensesByWeek,
  getExpensesByMonth,
  getExpensesByYear,
  getRecentExpenses,
} from "../Controllers/expenseController.js";
import { authenticateToken } from "../auth/verifyToken.js";

const router = express.Router();

router.post("/expenses", authenticateToken, addExpense);
router.put("/expenses/:id", authenticateToken, editExpense);
router.delete("/expenses/:id", authenticateToken, removeExpense);
router.get("/expenses", authenticateToken, getAllExpenses);
router.get(
  "/expenses/category/:category",
  authenticateToken,
  getExpensesByCategory
);
router.get("/expenses/week/:week/:year", authenticateToken, getExpensesByWeek);
router.get(
  "/expenses/month/:month/:year",
  authenticateToken,
  getExpensesByMonth
);
router.get("/expenses/year/:year", authenticateToken, getExpensesByYear);
router.get("/expenses/recent", authenticateToken, getRecentExpenses);

export default router;
