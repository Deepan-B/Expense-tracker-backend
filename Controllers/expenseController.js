import Expense from "../models/ExpenseSchema.js";

// Add a new expense
export const addExpense = async (req, res) => {
  const { expenseName, expenseCategory, amount, expenseDate } = req.body;
  const userId = req.body.userId; // Extracting user ID from the request object

  const newExpense = new Expense({
    expenseName,
    expenseCategory,
    amount,
    expenseDate,
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  try {
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit an expense
export const editExpense = async (req, res) => {
  const { id } = req.params;
  const { expenseName, expenseCategory, amount, expenseDate } = req.body;
  const userId = req.body.userId;

  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: id, userId },
      {
        expenseName,
        expenseCategory,
        amount,
        expenseDate,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedExpense) {
      return res
        .status(404)
        .json({ message: "Expense not found or not authorized" });
    }

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove an expense
export const removeExpense = async (req, res) => {
  const { id } = req.params;
  const userId = req.body.userId;

  try {
    const deletedExpense = await Expense.findOneAndDelete({ _id: id, userId });

    if (!deletedExpense) {
      return res
        .status(404)
        .json({ message: "Expense not found or not authorized" });
    }

    res.status(200).json({ message: "Expense removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Display all expenses
export const getAllExpenses = async (req, res) => {
  const userId = req.body.userId;

  try {
    const expenses = await Expense.find({ userId }).sort({ expenseDate: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Display expenses of specific category
export const getExpensesByCategory = async (req, res) => {
  const { category } = req.params;
  const userId = req.body.userId;

  try {
    const expenses = await Expense.find({
      userId,
      expenseCategory: category,
    }).sort({ expenseDate: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Display expenses of specific week
export const getExpensesByWeek = async (req, res) => {
  const { week, year } = req.params;
  const userId = req.body.userId;
  const startDate = new Date(year, 0, 1 + (week - 1) * 7);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 7);

  try {
    const expenses = await Expense.find({
      userId,
      expenseDate: { $gte: startDate, $lt: endDate },
    }).sort({ expenseDate: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Display expenses of specific month
export const getExpensesByMonth = async (req, res) => {
  const { month, year } = req.params;
  const userId = req.body.userId;
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  try {
    const expenses = await Expense.find({
      userId,
      expenseDate: { $gte: startDate, $lt: endDate },
    }).sort({ expenseDate: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Display expenses of specific year
export const getExpensesByYear = async (req, res) => {
  const { year } = req.params;
  const userId = req.user._id;
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  try {
    const expenses = await Expense.find({
      userId,
      expenseDate: { $gte: startDate, $lt: endDate },
    }).sort({ expenseDate: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Display recent expenses
export const getRecentExpenses = async (req, res) => {
  // console.log(req.body);
  const userId = req.body.userId;

  try {
    const recentExpenses = await Expense.find({ userId })
      .sort({ expenseDate: -1 })
      .limit(10);
    res.status(200).json(recentExpenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
