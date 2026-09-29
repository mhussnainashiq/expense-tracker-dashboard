import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Trash2,
  Pencil,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";

import API from "../services/api";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

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
          "Unable to load transactions."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await API.delete(`/transactions/${id}`);

      setTransactions((currentTransactions) =>
        currentTransactions.filter(
          (transaction) => transaction._id !== id
        )
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to delete transaction."
      );
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        transaction.description
          ?.toLowerCase()
          .includes(searchText) ||
        transaction.category
          ?.toLowerCase()
          .includes(searchText);

      const matchesType =
        typeFilter === "all" ||
        transaction.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [transactions, search, typeFilter]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Transactions
          </h1>

          <p className="page-description">
            Manage your income and expenses.
          </p>
        </div>

        <Link
          to="/transactions/add"
          className="add-btn"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
          }}
        >
          <Plus size={17} />
          Add Transaction
        </Link>
      </div>

      <div
        className="card"
        style={{
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              position: "relative",
              flex: 1,
              minWidth: "220px",
            }}
          >
            <Search
              size={18}
              style={{
                position: "absolute",
                left: "13px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#8a93a3",
              }}
            />

            <input
              className="form-input"
              type="text"
              placeholder="Search by description or category..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              style={{
                paddingLeft: "40px",
              }}
            />
          </div>

          <select
            className="form-input"
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(event.target.value)
            }
            style={{
              width: "180px",
            }}
          >
            <option value="all">
              All Transactions
            </option>

            <option value="income">
              Income
            </option>

            <option value="expense">
              Expenses
            </option>
          </select>
        </div>
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
          <p>Loading transactions...</p>
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div
          className="card"
          style={{
            textAlign: "center",
            padding: "50px 20px",
          }}
        >
          <div
            style={{
              fontSize: "40px",
              marginBottom: "15px",
            }}
          >
            💰
          </div>

          <h3
            style={{
              marginBottom: "8px",
            }}
          >
            No transactions found
          </h3>

          <p
            style={{
              color: "#7b8495",
              marginBottom: "20px",
            }}
          >
            Start tracking your finances by adding
            your first transaction.
          </p>

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
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Description</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map(
                (transaction) => (
                  <tr key={transaction._id}>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        {transaction.type ===
                        "income" ? (
                          <>
                            <ArrowUpCircle
                              size={18}
                              className="income"
                            />

                            <span className="income">
                              Income
                            </span>
                          </>
                        ) : (
                          <>
                            <ArrowDownCircle
                              size={18}
                              className="expense"
                            />

                            <span className="expense">
                              Expense
                            </span>
                          </>
                        )}
                      </div>
                    </td>

                    <td>
                      {transaction.description ||
                        "No description"}
                    </td>

                    <td>
                      <span
                        style={{
                          background: "#f1f2ff",
                          color: "#4f46e5",
                          padding: "5px 9px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {transaction.category}
                      </span>
                    </td>

                    <td>
                      {formatDate(transaction.date)}
                    </td>

                    <td>
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
                        $
                        {Number(
                          transaction.amount
                        ).toFixed(2)}
                      </strong>
                    </td>

                    <td>
                      <div
  style={{
    display: "flex",
    gap: "8px",
  }}
>
  <Link
    to={`/transactions/edit/${transaction._id}`}
    style={{
      border: "none",
      background: "#eeedff",
      color: "#4f46e5",
      width: "34px",
      height: "34px",
      borderRadius: "7px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    }}
    title="Edit transaction"
  >
    <Pencil size={16} />
  </Link>

  <button
    onClick={() =>
      handleDelete(transaction._id)
    }
    style={{
      border: "none",
      background: "#fee2e2",
      color: "#dc2626",
      width: "34px",
      height: "34px",
      borderRadius: "7px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    }}
    title="Delete transaction"
  >
    <Trash2 size={16} />
  </button>
</div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Transactions;
