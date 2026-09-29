import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import API from "../services/api";

function EditTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
    "Salary",
    "Freelance",
    "Other",
  ];

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get("/transactions");

        const transaction = response.data.find(
          (item) => item._id === id
        );

        if (!transaction) {
          setError("Transaction not found.");
          return;
        }

        setType(transaction.type);
        setAmount(transaction.amount);
        setCategory(transaction.category);
        setDescription(transaction.description || "");

        setDate(
          new Date(transaction.date)
            .toISOString()
            .split("T")[0]
        );
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load transaction."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (!category) {
      setError("Please select a category.");
      return;
    }

    try {
      setSaving(true);

      await API.put(`/transactions/${id}`, {
        type,
        amount: Number(amount),
        category,
        description,
        date,
      });

      navigate("/transactions");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update transaction."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page-content">
        <div className="card">
          <p>Loading transaction...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div style={{ marginBottom: "25px" }}>
        <Link
          to="/transactions"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            color: "#687386",
            fontSize: "14px",
            fontWeight: "600",
            marginBottom: "18px",
          }}
        >
          <ArrowLeft size={17} />
          Back to Transactions
        </Link>

        <h1 className="page-title">
          Edit Transaction
        </h1>

        <p className="page-description">
          Update your transaction details.
        </p>
      </div>

      <div
        className="card"
        style={{
          maxWidth: "700px",
        }}
      >
        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#b91c1c",
              padding: "13px",
              borderRadius: "9px",
              marginBottom: "22px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Transaction Type</label>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <button
                type="button"
                onClick={() => setType("income")}
                style={{
                  padding: "13px",
                  borderRadius: "9px",
                  border:
                    type === "income"
                      ? "2px solid #16a34a"
                      : "1px solid #dfe3eb",
                  background:
                    type === "income"
                      ? "#f0fdf4"
                      : "white",
                  color:
                    type === "income"
                      ? "#16a34a"
                      : "#687386",
                  fontWeight: "700",
                }}
              >
                + Income
              </button>

              <button
                type="button"
                onClick={() => setType("expense")}
                style={{
                  padding: "13px",
                  borderRadius: "9px",
                  border:
                    type === "expense"
                      ? "2px solid #dc2626"
                      : "1px solid #dfe3eb",
                  background:
                    type === "expense"
                      ? "#fef2f2"
                      : "white",
                  color:
                    type === "expense"
                      ? "#dc2626"
                      : "#687386",
                  fontWeight: "700",
                }}
              >
                - Expense
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Amount</label>

            <input
              className="form-input"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(event) =>
                setAmount(event.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              className="form-input"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              required
            >
              <option value="">
                Select a category
              </option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>

            <input
              className="form-input"
              type="text"
              placeholder="e.g. Grocery shopping"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Date</label>

            <input
              className="form-input"
              type="date"
              value={date}
              onChange={(event) =>
                setDate(event.target.value)
              }
              required
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "25px",
            }}
          >
            <Link
              to="/transactions"
              style={{
                flex: 1,
                textAlign: "center",
                padding: "13px",
                borderRadius: "9px",
                border: "1px solid #dfe3eb",
                color: "#687386",
                fontWeight: "700",
              }}
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="primary-btn"
              style={{
                flex: 1,
              }}
              disabled={saving}
            >
              {saving
                ? "Updating..."
                : "Update Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTransaction;