import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpCircle,
  ArrowDownCircle,
  Plus,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const transactions = [
  {
    id: 1,
    type: "income",
    amount: 5000,
    category: "Salary",
    description: "Monthly Salary",
    date: "Sep 01, 2026",
  },
  {
    id: 2,
    type: "expense",
    amount: 450,
    category: "Food",
    description: "Grocery Shopping",
    date: "Sep 03, 2026",
  },
  {
    id: 3,
    type: "expense",
    amount: 120,
    category: "Transport",
    description: "Fuel",
    date: "Sep 05, 2026",
  },
  {
    id: 4,
    type: "expense",
    amount: 300,
    category: "Entertainment",
    description: "Movie & Dinner",
    date: "Sep 08, 2026",
  },
  {
    id: 5,
    type: "income",
    amount: 1200,
    category: "Freelance",
    description: "Website Project",
    date: "Sep 10, 2026",
  },
  {
    id: 6,
    type: "expense",
    amount: 800,
    category: "Bills",
    description: "Electricity Bill",
    date: "Sep 12, 2026",
  },
];

const monthlyData = [
  { month: "Jan", expenses: 850 },
  { month: "Feb", expenses: 1100 },
  { month: "Mar", expenses: 950 },
  { month: "Apr", expenses: 1250 },
  { month: "May", expenses: 900 },
  { month: "Jun", expenses: 1400 },
  { month: "Jul", expenses: 1150 },
  { month: "Aug", expenses: 980 },
  { month: "Sep", expenses: 1670 },
  { month: "Oct", expenses: 0 },
  { month: "Nov", expenses: 0 },
  { month: "Dec", expenses: 0 },
];

const categoryData = [
  { name: "Bills", value: 800 },
  { name: "Food", value: 450 },
  { name: "Entertainment", value: 300 },
  { name: "Transport", value: 120 },
];

function Dashboard() {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );

  const balance = totalIncome - totalExpenses;

  const formatMoney = (amount) => {
    return `$${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="page-content">

      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Dashboard
          </h1>

          <p className="page-description">
            Here's an overview of your financial activity.
          </p>
        </div>

        <button
          className="add-btn"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
          }}
        >
          <Plus size={17} />
          Add Transaction
        </button>
      </div>

      {/* DEMO NOTICE */}
      <div
        style={{
          background: "#eef2ff",
          border: "1px solid #c7d2fe",
          color: "#4338ca",
          padding: "13px 16px",
          borderRadius: "10px",
          marginBottom: "22px",
          fontSize: "14px",
        }}
      >
        <strong>Demo Mode:</strong>{" "}
        Sample financial data is currently being displayed.
      </div>

      {/* STAT CARDS */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-header">
            <span>Total Balance</span>
            <Wallet size={20} />
          </div>

          <div className="stat-value">
            {formatMoney(balance)}
          </div>

          <div className="stat-change">
            Income minus expenses
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Total Income</span>
            <TrendingUp size={20} />
          </div>

          <div className="stat-value income">
            {formatMoney(totalIncome)}
          </div>

          <div className="stat-change">
            All recorded income
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Total Expenses</span>
            <TrendingDown size={20} />
          </div>

          <div className="stat-value expense">
            {formatMoney(totalExpenses)}
          </div>

          <div className="stat-change">
            All recorded expenses
          </div>
        </div>

      </div>

      {/* CHARTS */}
      <div className="dashboard-grid">

        {/* MONTHLY EXPENSES */}
        <div className="card">

          <div className="card-title">
            Monthly Expenses
          </div>

          <div className="chart-container">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart data={monthlyData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="month"
                />

                <YAxis />

                <Tooltip
                  formatter={(value) =>
                    formatMoney(value)
                  }
                />

                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#4f46e5"
                  fill="#eeedff"
                  strokeWidth={2}
                />

              </AreaChart>
            </ResponsiveContainer>

          </div>
        </div>

        {/* CATEGORY CHART */}
        <div className="card">

          <div className="card-title">
            Spending Categories
          </div>

          <div className="chart-container">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>

                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {categoryData.map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                      />
                    )
                  )}
                </Pie>

                <Tooltip
                  formatter={(value) =>
                    formatMoney(value)
                  }
                />

              </PieChart>
            </ResponsiveContainer>

          </div>
        </div>

      </div>

      {/* RECENT TRANSACTIONS */}
      <div className="card">

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div
            className="card-title"
            style={{ marginBottom: 0 }}
          >
            Recent Transactions
          </div>

          <a
            href="/transactions"
            style={{
              color: "#4f46e5",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
            View All
          </a>
        </div>

        <div className="transaction-list">

          {transactions.slice(0, 5).map(
            (transaction) => (
              <div
                className="transaction-item"
                key={transaction.id}
              >

                <div className="transaction-left">

                  <div className="transaction-icon">

                    {transaction.type ===
                    "income" ? (
                      <ArrowUpCircle size={20} />
                    ) : (
                      <ArrowDownCircle size={20} />
                    )}

                  </div>

                  <div>

                    <div className="transaction-name">
                      {transaction.description}
                    </div>

                    <div className="transaction-category">
                      {transaction.category} •{" "}
                      {transaction.date}
                    </div>

                  </div>

                </div>

                <strong
                  className={
                    transaction.type ===
                    "income"
                      ? "income"
                      : "expense"
                  }
                >
                  {transaction.type === "income"
                    ? "+"
                    : "-"}
                  {formatMoney(
                    transaction.amount
                  )}
                </strong>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;