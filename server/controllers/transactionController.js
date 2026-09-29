const Transaction = require("../models/Transaction");

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id,
    }).sort({ date: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Get transactions error:", error);

    res.status(500).json({
      message: "Unable to fetch transactions.",
    });
  }
};

const createTransaction = async (req, res) => {
  try {
    const {
      type,
      amount,
      category,
      description,
      date,
    } = req.body;

    if (!type || amount === undefined || !category) {
      return res.status(400).json({
        message: "Type, amount and category are required.",
      });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({
        message: "Transaction type must be income or expense.",
      });
    }

    const transaction = await Transaction.create({
      userId: req.user.id,
      type,
      amount: Number(amount),
      category,
      description: description || "",
      date: date || new Date(),
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error("Create transaction error:", error);

    res.status(500).json({
      message: "Unable to create transaction.",
    });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found.",
      });
    }

    const {
      type,
      amount,
      category,
      description,
      date,
    } = req.body;

    if (!type || amount === undefined || !category) {
      return res.status(400).json({
        message: "Type, amount and category are required.",
      });
    }

    transaction.type = type;
    transaction.amount = Number(amount);
    transaction.category = category;
    transaction.description = description || "";
    transaction.date = date || transaction.date;

    await transaction.save();

    res.status(200).json(transaction);
  } catch (error) {
    console.error("Update transaction error:", error);

    res.status(500).json({
      message: "Unable to update transaction.",
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found.",
      });
    }

    res.status(200).json({
      message: "Transaction deleted successfully.",
    });
  } catch (error) {
    console.error("Delete transaction error:", error);

    res.status(500).json({
      message: "Unable to delete transaction.",
    });
  }
};

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};