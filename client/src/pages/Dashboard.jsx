import {
  Wallet,
  TrendingUp,
  TrendingDown,
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

const monthlyData = [
  { month: "Jan", expenses: 1200 },
  { month: "Feb", expenses: 950 },
  { month: "Mar", expenses: 1400 },
  { month: "Apr", expenses: 1100 },
  { month: "May", expenses: 1600 },
  { month: "Jun", expenses: 1350 },
];

const categoryData = [
  { name: "Food", value: 35 },
  { name: "Transport", value: 20 },
  { name: "Shopping", value: 25 },
  { name: "Bills", value: 20 },
];

function Dashboard() {
  return (
    <div className="page-content">
      <h1 className="page-title">Dashboard</h1>

      <p className="page-description">
        Here's an overview of your financial activity.
      </p>

      <div className="stats-grid">
        <StatCard
          title="Total Balance"
          value="$8,450.00"
          change="Available balance"
          icon={<Wallet size={20} />}
        />

        <StatCard
          title="Total Income"
          value="$12,500.00"
          change="+8.2% this month"
          icon={<TrendingUp size={20} />}
        />

        <StatCard
          title="Total Expenses"
          value="$4,050.00"
          change="-3.4% this month"
          icon={<TrendingDown size={20} />}
        />
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-title">
            Monthly Expenses
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#4f46e5"
                  fill="#eeedff"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-title">
            Spending Categories
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
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
                  {categoryData.map((entry, index) => (
                    <Cell key={index} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">
          Recent Transactions
        </div>

        <div className="transaction-list">
          <div className="transaction-item">
            <div className="transaction-left">
              <div className="transaction-icon">🍔</div>

              <div>
                <div className="transaction-name">
                  Grocery Shopping
                </div>

                <div className="transaction-category">
                  Food
                </div>
              </div>
            </div>

            <strong className="expense">
              -$85.00
            </strong>
          </div>

          <div className="transaction-item">
            <div className="transaction-left">
              <div className="transaction-icon">💼</div>

              <div>
                <div className="transaction-name">
                  Monthly Salary
                </div>

                <div className="transaction-category">
                  Salary
                </div>
              </div>
            </div>

            <strong className="income">
              +$2,500.00
            </strong>
          </div>

          <div className="transaction-item">
            <div className="transaction-left">
              <div className="transaction-icon">🚗</div>

              <div>
                <div className="transaction-name">
                  Fuel
                </div>

                <div className="transaction-category">
                  Transport
                </div>
              </div>
            </div>

            <strong className="expense">
              -$65.00
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;