import { useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import EditTransaction from "./pages/EditTransaction";

/* =========================================================
   SIMPLE PAGE
========================================================= */

function SimplePage({ title, description }) {
  return (
    <div className="page-content">
      <h1 className="page-title">{title}</h1>

      <p className="page-description">
        {description}
      </p>

      <div className="card">
        <h3 style={{ marginBottom: "10px" }}>
          Coming Soon
        </h3>

        <p style={{ color: "#7b8495" }}>
          This section will be built next.
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   BUDGETS
========================================================= */

function Budgets() {
  const [budgets, setBudgets] = useState([
    {
      id: 1,
      category: "Food",
      budget: 600,
      spent: 450,
    },
    {
      id: 2,
      category: "Transport",
      budget: 300,
      spent: 120,
    },
    {
      id: 3,
      category: "Bills",
      budget: 1000,
      spent: 800,
    },
    {
      id: 4,
      category: "Entertainment",
      budget: 400,
      spent: 300,
    },
    {
      id: 5,
      category: "Shopping",
      budget: 700,
      spent: 350,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    category: "",
    budget: "",
    spent: "0",
  });

  const formatMoney = (amount) => {
    return `$${Number(amount).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  };

  const totalBudget = budgets.reduce(
    (total, item) =>
      total + Number(item.budget),
    0
  );

  const totalSpent = budgets.reduce(
    (total, item) =>
      total + Number(item.spent),
    0
  );

  const remaining = totalBudget - totalSpent;

  const percentage =
    totalBudget > 0
      ? Math.round(
          (totalSpent / totalBudget) * 100
        )
      : 0;

  /* OPEN ADD FORM */

  const openAddForm = () => {
    setEditingId(null);

    setFormData({
      category: "",
      budget: "",
      spent: "0",
    });

    setShowForm(true);
  };

  /* OPEN EDIT FORM */

  const openEditForm = (budget) => {
    setEditingId(budget.id);

    setFormData({
      category: budget.category,
      budget: budget.budget,
      spent: budget.spent,
    });

    setShowForm(true);
  };

  /* SAVE BUDGET */

  const saveBudget = (event) => {
    event.preventDefault();

    if (
      !formData.category.trim() ||
      !formData.budget ||
      Number(formData.budget) <= 0
    ) {
      alert(
        "Please enter a category and a valid budget."
      );

      return;
    }

    if (editingId) {
      setBudgets((currentBudgets) =>
        currentBudgets.map((item) =>
          item.id === editingId
            ? {
                ...item,
                category:
                  formData.category.trim(),
                budget: Number(
                  formData.budget
                ),
                spent: Number(
                  formData.spent || 0
                ),
              }
            : item
        )
      );

      alert("Budget updated successfully.");
    } else {
      const newBudget = {
        id: Date.now(),
        category:
          formData.category.trim(),
        budget: Number(
          formData.budget
        ),
        spent: Number(
          formData.spent || 0
        ),
      };

      setBudgets((currentBudgets) => [
        ...currentBudgets,
        newBudget,
      ]);

      alert("Budget added successfully.");
    }

    setShowForm(false);

    setFormData({
      category: "",
      budget: "",
      spent: "0",
    });

    setEditingId(null);
  };

  /* DELETE BUDGET */

  const deleteBudget = (id) => {
    const budget = budgets.find(
      (item) => item.id === id
    );

    if (!budget) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete the ${budget.category} budget?`
    );

    if (!confirmed) return;

    setBudgets((currentBudgets) =>
      currentBudgets.filter(
        (item) => item.id !== id
      )
    );
  };

  return (
    <div className="page-content">
      {/* HEADER */}

      <div className="page-header">
        <div>
          <h1 className="page-title">
            Budgets
          </h1>

          <p className="page-description">
            Set spending limits and track your
            monthly budget.
          </p>
        </div>

        <button
          className="add-btn"
          onClick={openAddForm}
        >
          + Add Budget
        </button>
      </div>

      {/* FORM */}

      {showForm && (
        <div
          className="card"
          style={{
            marginBottom: "20px",
            maxWidth: "750px",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              marginBottom: "20px",
            }}
          >
            {editingId
              ? "Edit Budget"
              : "Add New Budget"}
          </h2>

          <form onSubmit={saveBudget}>
            <div className="form-group">
              <label>Category</label>

              <input
                className="form-input"
                type="text"
                placeholder="e.g. Food"
                value={formData.category}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    category:
                      event.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Monthly Budget</label>

              <input
                className="form-input"
                type="number"
                min="1"
                placeholder="e.g. 500"
                value={formData.budget}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    budget:
                      event.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Amount Spent</label>

              <input
                className="form-input"
                type="number"
                min="0"
                placeholder="e.g. 200"
                value={formData.spent}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    spent:
                      event.target.value,
                  })
                }
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                className="add-btn"
                type="submit"
              >
                {editingId
                  ? "Update Budget"
                  : "Add Budget"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                style={{
                  padding: "11px 17px",
                  borderRadius: "8px",
                  border:
                    "1px solid #dfe3eb",
                  background: "white",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SUMMARY */}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span>Total Budget</span>
          </div>

          <div className="stat-value">
            {formatMoney(totalBudget)}
          </div>

          <div className="stat-change">
            Monthly spending limit
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Total Spent</span>
          </div>

          <div className="stat-value expense">
            {formatMoney(totalSpent)}
          </div>

          <div className="stat-change">
            {percentage}% of total budget used
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Remaining</span>
          </div>

          <div className="stat-value income">
            {formatMoney(remaining)}
          </div>

          <div className="stat-change">
            Available for the rest of the month
          </div>
        </div>
      </div>

      {/* OVERALL PROGRESS */}

      <div
        className="card"
        style={{
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "18px",
                marginBottom: "4px",
              }}
            >
              Overall Budget
            </h2>

            <p
              style={{
                color: "#7b8495",
                fontSize: "13px",
              }}
            >
              {formatMoney(totalSpent)} spent of{" "}
              {formatMoney(totalBudget)}
            </p>
          </div>

          <strong>
            {percentage}%
          </strong>
        </div>

        <div
          style={{
            width: "100%",
            height: "12px",
            background: "#edf0f4",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${Math.min(
                percentage,
                100
              )}%`,
              height: "100%",
              background:
                percentage >= 90
                  ? "#dc2626"
                  : percentage >= 70
                  ? "#f59e0b"
                  : "#4f46e5",
              borderRadius: "20px",
            }}
          />
        </div>
      </div>

      {/* BUDGET LIST */}

      <div className="card">
        <h2
          style={{
            fontSize: "18px",
            marginBottom: "5px",
          }}
        >
          Category Budgets
        </h2>

        <p
          style={{
            color: "#7b8495",
            fontSize: "13px",
            marginBottom: "10px",
          }}
        >
          Track your spending by category.
        </p>

        {budgets.length === 0 ? (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              color: "#7b8495",
            }}
          >
            No budgets available.
          </div>
        ) : (
          budgets.map((item) => {
            const itemPercentage =
              item.budget > 0
                ? Math.round(
                    (item.spent /
                      item.budget) *
                      100
                  )
                : 0;

            const itemRemaining =
              item.budget - item.spent;

            return (
              <div
                key={item.id}
                style={{
                  padding: "20px 0",
                  borderBottom:
                    "1px solid #edf0f4",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <div>
                    <strong>
                      {item.category}
                    </strong>

                    <div
                      style={{
                        color: "#8a93a3",
                        fontSize: "12px",
                        marginTop: "4px",
                      }}
                    >
                      {formatMoney(
                        item.spent
                      )}{" "}
                      spent •{" "}
                      {formatMoney(
                        itemRemaining
                      )}{" "}
                      remaining
                    </div>
                  </div>

                  <strong>
                    {formatMoney(
                      item.budget
                    )}
                  </strong>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: "9px",
                    background: "#edf0f4",
                    borderRadius: "20px",
                    overflow: "hidden",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      width: `${Math.min(
                        itemPercentage,
                        100
                      )}%`,
                      height: "100%",
                      background:
                        itemPercentage >= 90
                          ? "#dc2626"
                          : itemPercentage >=
                            70
                          ? "#f59e0b"
                          : "#4f46e5",
                      borderRadius: "20px",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color:
                        itemPercentage >=
                        90
                          ? "#dc2626"
                          : itemPercentage >=
                            70
                          ? "#d97706"
                          : "#718096",
                    }}
                  >
                    {itemPercentage}% used
                  </span>

                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                    }}
                  >
                    <button
                      onClick={() =>
                        openEditForm(item)
                      }
                      style={{
                        border:
                          "1px solid #dfe3eb",
                        background:
                          "white",
                        padding:
                          "7px 11px",
                        borderRadius:
                          "7px",
                        fontWeight:
                          "600",
                        cursor:
                          "pointer",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteBudget(
                          item.id
                        )
                      }
                      style={{
                        border:
                          "1px solid #fecaca",
                        background:
                          "#fff5f5",
                        color:
                          "#dc2626",
                        padding:
                          "7px 11px",
                        borderRadius:
                          "7px",
                        fontWeight:
                          "600",
                        cursor:
                          "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

/* =========================================================
   CATEGORIES
========================================================= */

function Categories() {
  const [categories, setCategories] =
    useState([
      {
        id: 1,
        name: "Food",
        type: "Expense",
        transactions: 24,
        description:
          "Restaurants, groceries and meals",
      },
      {
        id: 2,
        name: "Transport",
        type: "Expense",
        transactions: 12,
        description:
          "Fuel, taxi and transportation",
      },
      {
        id: 3,
        name: "Bills",
        type: "Expense",
        transactions: 8,
        description:
          "Electricity, internet and utilities",
      },
      {
        id: 4,
        name: "Entertainment",
        type: "Expense",
        transactions: 6,
        description:
          "Movies, games and activities",
      },
      {
        id: 5,
        name: "Shopping",
        type: "Expense",
        transactions: 15,
        description:
          "Clothes, electronics and shopping",
      },
      {
        id: 6,
        name: "Salary",
        type: "Income",
        transactions: 3,
        description:
          "Monthly salary income",
      },
      {
        id: 7,
        name: "Freelance",
        type: "Income",
        transactions: 5,
        description:
          "Freelance and project income",
      },
    ]);

  const [showForm, setShowForm] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      type: "Expense",
      description: "",
    });

  const openAddForm = () => {
    setEditingId(null);

    setFormData({
      name: "",
      type: "Expense",
      description: "",
    });

    setShowForm(true);
  };

  const openEditForm = (category) => {
    setEditingId(category.id);

    setFormData({
      name: category.name,
      type: category.type,
      description:
        category.description,
    });

    setShowForm(true);
  };

  const saveCategory = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter a category name.");
      return;
    }

    if (editingId) {
      setCategories(
        (currentCategories) =>
          currentCategories.map(
            (category) =>
              category.id === editingId
                ? {
                    ...category,
                    name: formData.name.trim(),
                    type: formData.type,
                    description:
                      formData.description.trim(),
                  }
                : category
          )
      );

      alert(
        "Category updated successfully."
      );
    } else {
      const newCategory = {
        id: Date.now(),
        name: formData.name.trim(),
        type: formData.type,
        transactions: 0,
        description:
          formData.description.trim() ||
          "Custom category",
      };

      setCategories(
        (currentCategories) => [
          ...currentCategories,
          newCategory,
        ]
      );

      alert(
        "Category added successfully."
      );
    }

    setShowForm(false);
    setEditingId(null);

    setFormData({
      name: "",
      type: "Expense",
      description: "",
    });
  };

  const deleteCategory = (id) => {
    const category = categories.find(
      (item) => item.id === id
    );

    if (!category) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete the ${category.name} category?`
    );

    if (!confirmed) return;

    setCategories(
      (currentCategories) =>
        currentCategories.filter(
          (item) => item.id !== id
        )
    );
  };

  return (
    <div className="page-content">
      {/* HEADER */}

      <div className="page-header">
        <div>
          <h1 className="page-title">
            Categories
          </h1>

          <p className="page-description">
            Organize your income and expenses by
            category.
          </p>
        </div>

        <button
          className="add-btn"
          onClick={openAddForm}
        >
          + Add Category
        </button>
      </div>

      {/* FORM */}

      {showForm && (
        <div
          className="card"
          style={{
            maxWidth: "750px",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              marginBottom: "20px",
            }}
          >
            {editingId
              ? "Edit Category"
              : "Add New Category"}
          </h2>

          <form onSubmit={saveCategory}>
            <div className="form-group">
              <label>Category Name</label>

              <input
                className="form-input"
                type="text"
                placeholder="e.g. Health"
                value={formData.name}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    name:
                      event.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Type</label>

              <select
                className="form-input"
                value={formData.type}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    type:
                      event.target.value,
                  })
                }
              >
                <option value="Expense">
                  Expense
                </option>

                <option value="Income">
                  Income
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>

              <textarea
                className="form-input"
                rows="3"
                placeholder="Describe this category"
                value={
                  formData.description
                }
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    description:
                      event.target.value,
                  })
                }
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                className="add-btn"
                type="submit"
              >
                {editingId
                  ? "Update Category"
                  : "Add Category"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                style={{
                  padding: "11px 17px",
                  borderRadius: "8px",
                  border:
                    "1px solid #dfe3eb",
                  background: "white",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SUMMARY */}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span>
              Total Categories
            </span>
          </div>

          <div className="stat-value">
            {categories.length}
          </div>

          <div className="stat-change">
            All available categories
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>
              Expense Categories
            </span>
          </div>

          <div className="stat-value expense">
            {
              categories.filter(
                (category) =>
                  category.type ===
                  "Expense"
              ).length
            }
          </div>

          <div className="stat-change">
            Categories used for spending
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>
              Income Categories
            </span>
          </div>

          <div className="stat-value income">
            {
              categories.filter(
                (category) =>
                  category.type ===
                  "Income"
              ).length
            }
          </div>

          <div className="stat-change">
            Categories used for income
          </div>
        </div>
      </div>

      {/* TABLE */}

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Type</th>
              <th>Transactions</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map(
              (category) => (
                <tr key={category.id}>
                  <td>
                    <strong>
                      {category.name}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={
                        category.type ===
                        "Income"
                          ? "income"
                          : "expense"
                      }
                      style={{
                        fontWeight:
                          "700",
                      }}
                    >
                      {category.type}
                    </span>
                  </td>

                  <td>
                    {category.transactions}
                  </td>

                  <td>
                    <span
                      style={{
                        color:
                          "#7b8495",
                      }}
                    >
                      {
                        category.description
                      }
                    </span>
                  </td>

                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                      }}
                    >
                      <button
                        onClick={() =>
                          openEditForm(
                            category
                          )
                        }
                        style={{
                          border:
                            "1px solid #dfe3eb",
                          background:
                            "white",
                          padding:
                            "7px 11px",
                          borderRadius:
                            "7px",
                          fontWeight:
                            "600",
                          cursor:
                            "pointer",
                        }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteCategory(
                            category.id
                          )
                        }
                        style={{
                          border:
                            "1px solid #fecaca",
                          background:
                            "#fff5f5",
                          color:
                            "#dc2626",
                          padding:
                            "7px 11px",
                          borderRadius:
                            "7px",
                          fontWeight:
                            "600",
                          cursor:
                            "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================
   PROFILE
========================================================= */

function Profile() {
  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Profile
          </h1>

          <p className="page-description">
            Manage your personal information.
          </p>
        </div>
      </div>

      <div
        className="card"
        style={{
          maxWidth: "750px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "#eeedff",
              color: "#4f46e5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "25px",
              fontWeight: "800",
            }}
          >
            DU
          </div>

          <div>
            <h2
              style={{
                fontSize: "20px",
                marginBottom: "5px",
              }}
            >
              Demo User
            </h2>

            <p
              style={{
                color: "#7b8495",
                fontSize: "14px",
              }}
            >
              demo@example.com
            </p>
          </div>
        </div>

        <div className="form-group">
          <label>Full Name</label>

          <input
            className="form-input"
            type="text"
            defaultValue="Demo User"
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>

          <input
            className="form-input"
            type="email"
            defaultValue="demo@example.com"
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>

          <input
            className="form-input"
            type="tel"
            placeholder="+92 300 0000000"
          />
        </div>

        <button
          className="add-btn"
          onClick={() =>
            alert(
              "Profile updated successfully!"
            )
          }
        >
          Save Profile
        </button>
      </div>

      <div
        className="card"
        style={{
          maxWidth: "750px",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            marginBottom: "6px",
          }}
        >
          Account Information
        </h2>

        <p
          style={{
            color: "#7b8495",
            fontSize: "14px",
            marginBottom: "20px",
          }}
        >
          Information about your ExpenseFlow
          account.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px 0",
            borderBottom:
              "1px solid #edf0f4",
          }}
        >
          <span
            style={{
              color: "#7b8495",
            }}
          >
            Account Status
          </span>

          <strong className="income">
            Active
          </strong>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px 0",
          }}
        >
          <span
            style={{
              color: "#7b8495",
            }}
          >
            Account Type
          </span>

          <strong>
            Personal
          </strong>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SETTINGS
========================================================= */

function Settings() {
  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Settings
          </h1>

          <p className="page-description">
            Manage your application preferences.
          </p>
        </div>
      </div>

      <div
        className="card"
        style={{
          marginBottom: "20px",
          maxWidth: "750px",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            marginBottom: "6px",
          }}
        >
          General Settings
        </h2>

        <p
          style={{
            color: "#7b8495",
            fontSize: "14px",
            marginBottom: "25px",
          }}
        >
          Customize how ExpenseFlow works for you.
        </p>

        <div className="form-group">
          <label>Currency</label>

          <select
            className="form-input"
            defaultValue="USD"
          >
            <option value="USD">
              USD — US Dollar ($)
            </option>

            <option value="PKR">
              PKR — Pakistani Rupee (₨)
            </option>

            <option value="EUR">
              EUR — Euro (€)
            </option>

            <option value="GBP">
              GBP — British Pound (£)
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>Date Format</label>

          <select
            className="form-input"
            defaultValue="MM/DD/YYYY"
          >
            <option value="MM/DD/YYYY">
              MM/DD/YYYY
            </option>

            <option value="DD/MM/YYYY">
              DD/MM/YYYY
            </option>

            <option value="YYYY-MM-DD">
              YYYY-MM-DD
            </option>
          </select>
        </div>

        <button
          className="add-btn"
          onClick={() =>
            alert(
              "Settings saved successfully!"
            )
          }
        >
          Save Changes
        </button>
      </div>

      <div
        className="card"
        style={{
          marginBottom: "20px",
          maxWidth: "750px",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            marginBottom: "6px",
          }}
        >
          Notifications
        </h2>

        <p
          style={{
            color: "#7b8495",
            fontSize: "14px",
            marginBottom: "20px",
          }}
        >
          Choose which notifications you want to
          receive.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 0",
            borderBottom:
              "1px solid #edf0f4",
          }}
        >
          <div>
            <strong>
              Budget Alerts
            </strong>

            <p
              style={{
                color: "#8a93a3",
                fontSize: "13px",
                marginTop: "4px",
              }}
            >
              Notify me when I approach my budget
              limit.
            </p>
          </div>

          <input
            type="checkbox"
            defaultChecked
            style={{
              width: "18px",
              height: "18px",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 0",
          }}
        >
          <div>
            <strong>
              Monthly Summary
            </strong>

            <p
              style={{
                color: "#8a93a3",
                fontSize: "13px",
                marginTop: "4px",
              }}
            >
              Receive a summary of your monthly
              spending.
            </p>
          </div>

          <input
            type="checkbox"
            defaultChecked
            style={{
              width: "18px",
              height: "18px",
            }}
          />
        </div>
      </div>

      <div
        className="card"
        style={{
          maxWidth: "750px",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            marginBottom: "6px",
          }}
        >
          Security
        </h2>

        <p
          style={{
            color: "#7b8495",
            fontSize: "14px",
            marginBottom: "20px",
          }}
        >
          Manage your account security.
        </p>

        <button
          style={{
            padding: "11px 17px",
            borderRadius: "8px",
            border:
              "1px solid #dfe3eb",
            background: "white",
            color: "#172033",
            fontWeight: "700",
            cursor: "pointer",
          }}
          onClick={() =>
            alert(
              "Password change will be connected to the backend later."
            )
          }
        >
          Change Password
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   DASHBOARD LAYOUT
========================================================= */

function DashboardLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "#f5f7fb",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          marginLeft: "250px",
          minWidth: 0,
        }}
      >
        <Header />

        <Routes>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/transactions"
            element={<Transactions />}
          />

          <Route
            path="/transactions/add"
            element={<AddTransaction />}
          />

          <Route
            path="/transactions/edit/:id"
            element={<EditTransaction />}
          />

          <Route
            path="/budgets"
            element={<Budgets />}
          />

          <Route
            path="/categories"
            element={<Categories />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route
            path="*"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

/* =========================================================
   APP
========================================================= */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={<DashboardLayout />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
