import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowUpCircle,
  ArrowDownCircle,
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

import StatCard from "../components/StatCard";
import API from "../services/api";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/transactions");

      setTransactions(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const totals = useMemo(() => {
    let income = 0;
    let expenses = 0;

    transactions.forEach((transaction) => {
      const amount = Number(transaction.amount) || 0;

      if (transaction.type === "income") {
        income += amount;
      } else {
        expenses += amount;
      }
    });

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  const monthlyData = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const data = months.map((month) => ({
      month,
      expenses: 0,
    }));

    transactions.forEach((transaction) => {
      if (transaction.type !== "expense") {
        return;
      }

      const date = new Date(transaction.date);

      if (Number.isNaN(date.getTime())) {
        return;
      }

      const monthIndex = date.getMonth();

      data[monthIndex].expenses +=
        Number(transaction.amount) || 0;
    });

    return data;
  }, [transactions]);

  const categoryData = useMemo(() => {
    const categories = {};

    transactions.forEach((transaction) => {
      if (transaction.type !== "expense") {
        return;
      }

      const category =
        transaction.category || "Other";

      categories[category] =
        (categories[category] || 0) +
        (Number(transaction.amount) || 0);
    });

    return Object.entries(categories).map(
      ([name, value]) => ({
        name,
        value,
      })
    );
  }, [transactions]);

  const recentTransactions = transactions.slice(
    0,
    5
  );

  const formatMoney = (amount) => {
    return `$${Number(amount).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Dashboard
          </h1>

          <p className="page-description">
            Here's an overview of your financial
            activity.
          </p>
        </div>

        <Link
          to="/transactions/add"
          className="add-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
          }}
        >
          <Plus size={17} />
          Add Transaction
        </Link>
      </div>

      {error && (
        <div
          style={{
            background: "#fee2e2",
            color: "#b91c1c",
            padding: "14px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      {loading ? (
        <div className="card">
          <p>Loading dashboard...</p>
        </div>
      ) : (
        <>
          <div className="stats-grid">
            <StatCard
              title="Total Balance"
              value={formatMoney(
                totals.balance
              )}
              change="Income minus expenses"
              icon={<Wallet size={20} />}
            />

            <StatCard
              title="Total Income"
              value={formatMoney(
                totals.income
              )}
              change="All recorded income"
              icon={
                <TrendingUp size={20} />
              }
            />

            <StatCard
              title="Total Expenses"
              value={formatMoney(
                totals.expenses
              )}
              change="All recorded expenses"
              icon={
                <TrendingDown size={20} />
              }
            />
          </div>

          <div className="dashboard-grid">
            <div className="card">
              <div className="card-title">
                Monthly Expenses
              </div>

              {transactions.length === 0 ? (
                <div
                  style={{
                    height: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#7b8495",
                  }}
                >
                  No expense data available yet.
                </div>
              ) : (
                <div className="chart-container">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <AreaChart
                      data={monthlyData}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                      />

                      <XAxis dataKey="month" />

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
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <div className="card">
              <div className="card-title">
                Spending Categories
              </div>

              {categoryData.length === 0 ? (
                <div
                  style={{
                    height: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "#7b8495",
                  }}
                >
                  No spending data available yet.
                </div>
              ) : (
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
                        outerRadius={95}
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
              )}
            </div>
          </div>

          <div className="card">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <div className="card-title" style={{ marginBottom: 0 }}>
                Recent Transactions
              </div>

              <Link
                to="/transactions"
                style={{
                  color: "#4f46e5",
                  fontSize: "13px",
                  fontWeight: "700",
                }}
              >
                View All
              </Link>
            </div>

            {recentTransactions.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "35px 20px",
                  color: "#7b8495",
                }}
              >
                <div
                  style={{
                    fontSize: "35px",
                    marginBottom: "10px",
                  }}
                >
                  💰
                </div>

                <p>
                  No transactions yet.
                </p>

                <Link
                  to="/transactions/add"
                  className="add-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    marginTop: "15px",
                  }}
                >
                  <Plus size={17} />
                  Add Your First Transaction
                </Link>
              </div>
            ) : (
              <div className="transaction-list">
                {recentTransactions.map(
                  (transaction) => (
                    <div
                      className="transaction-item"
                      key={transaction._id}
                    >
                      <div className="transaction-left">
                        <div className="transaction-icon">
                          {transaction.type ===
                          "income" ? (
                            <ArrowUpCircle
                              size={20}
                            />
                          ) : (
                            <ArrowDownCircle
                              size={20}
                            />
                          )}
                        </div>

                        <div>
                          <div className="transaction-name">
                            {transaction.description ||
                              "No description"}
                          </div>

                          <div className="transaction-category">
                            {transaction.category}{" "}
                            •{" "}
                            {formatDate(
                              transaction.date
                            )}
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
                        {transaction.type ===
                        "income"
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
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;