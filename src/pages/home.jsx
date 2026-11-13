
import Hero from "../components/hero.jsx";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

// Categories
const expenseType = {
  food: "Food & Drinks",
  transportation: "Transportation",
  shopping: "Shopping",
  entertainment: "Entertainment",
  education: "Education",
  housing: "Housing & Rent",
  bills: "Bills & Subscriptions",
  health: "Health & Personal Care",
  savings: "Savings",
  other: "Other"
};

const incomeType = {
  allowance: "Allowance",
  salary: "Salary",
  freelance: "Freelance",
  business: "Business",
  scholarship: "Scholarship",
  gift: "Gift",
  investment: "Investment",
  other: "Other"
};

export default function Home() {

  const [expense, setExpense] = useState(() => {
    try {
      const saved = localStorage.getItem("expenses");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [income, setIncome] = useState(() => {
    try {
      const saved = localStorage.getItem("income");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Form states
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("food");
  const [transactionMode, setTransactionMode] = useState("expense");

  // Edit states
  const [editingId, setEditingId] = useState(null);
  const [editingMode, setEditingMode] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [editType, setEditType] = useState("");

  // Save transactions
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expense));
  }, [expense]);

  useEffect(() => {
    localStorage.setItem("income", JSON.stringify(income));
  }, [income]);

  // CREATE
  function createExpense(amount, type) {
    setExpense((prev) => [
      ...prev,
      {
        id: nanoid(),
        amount: Number(amount),
        type: type
      }
    ]);
  }

  function createIncome(amount, type) {
    setIncome((prev) => [
      ...prev,
      {
        id: nanoid(),
        amount: Number(amount),
        type: type
      }
    ]);
  }

  // DELETE
  function deleteExpense(id) {
    setExpense((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  function deleteIncome(id) {
    setIncome((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  // EDIT
  function editExpense(id, newAmount, newType) {
    setExpense((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              amount: Number(newAmount),
              type: newType
            }
          : item
      )
    );
  }

  function editIncome(id, newAmount, newType) {
    setIncome((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              amount: Number(newAmount),
              type: newType
            }
          : item
      )
    );
  }

  // FORM SUBMISSION
  function handleSubmit(e) {
    e.preventDefault();

    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    if (transactionMode === "expense") {
      createExpense(value, type);
    } else {
      createIncome(value, type);
    }

    setAmount("");
  }

  function changeMode(mode) {
    setTransactionMode(mode);
    setType(mode === "expense" ? "food" : "allowance");
  }

  // EDIT CONTROLS
  function startEdit(item, mode) {
    setEditingId(item.id);
    setEditingMode(mode);
    setEditAmount(String(item.amount));
    setEditType(item.type);
  }

  function saveEdit() {
    const value = Number(editAmount);

    if (!Number.isFinite(value) || value <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    if (editingMode === "expense") {
      editExpense(editingId, value, editType);
    } else {
      editIncome(editingId, value, editType);
    }

    cancelEdit();
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingMode(null);
    setEditAmount("");
    setEditType("");
  }

  // FINANCIAL SUMMARY
  const totalIncome = income.reduce(
    (total, item) => total + item.amount,
    0
  );

  const totalExpense = expense.reduce(
    (total, item) => total + item.amount,
    0
  );

  const balance = totalIncome - totalExpense;

  return (
    <div>
      <div className="financial-summary">
        <h2>Financial Summary</h2>

        <div>
          <h3>Current Balance</h3>
          <h1>Rp{balance.toLocaleString("id-ID")}</h1>
        </div>

        <div>
          <h3>Total Income</h3>
          <p>+Rp{totalIncome.toLocaleString("id-ID")}</p>
        </div>

        <div>
          <h3>Total Expenses</h3>
          <p>-Rp{totalExpense.toLocaleString("id-ID")}</p>
        </div>
      </div>

      {/* ADD TRANSACTION FORM */}
      <form onSubmit={handleSubmit}>
        <h2>Add Transaction</h2>

        <label>Transaction Type</label>
        <select
          value={transactionMode}
          onChange={(e) => changeMode(e.target.value)}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <label>Amount (Rp)</label>
        <input
          type="number"
          min="1"
          step="any"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <label>Category</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {Object.entries(
            transactionMode === "expense"
              ? expenseType
              : incomeType
          ).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <button type="submit">Add Transaction</button>
      </form>

      {/* TRANSACTION HISTORY */}
      <div className="transaction-history">
        <h2>Transaction History</h2>

        {/* EXPENSES */}
        <h3>Expenses</h3>

        {expense.length === 0 && (
          <p>No expenses yet.</p>
        )}

        {expense.map((item) => (
          <div key={item.id}>
            {editingId === item.id &&
            editingMode === "expense" ? (
              <div>
                <input
                  type="number"
                  min="1"
                  step="any"
                  value={editAmount}
                  onChange={(e) =>
                    setEditAmount(e.target.value)
                  }
                />

                <select
                  value={editType}
                  onChange={(e) =>
                    setEditType(e.target.value)
                  }
                >
                  {Object.entries(expenseType).map(
                    ([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    )
                  )}
                </select>

                <button onClick={saveEdit}>
                  Save
                </button>

                <button onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <p>
                  Category: {expenseType[item.type]}
                </p>

                <p>
                  Amount: Rp
                  {item.amount.toLocaleString("id-ID")}
                </p>

                <button
                  onClick={() =>
                    startEdit(item, "expense")
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteExpense(item.id)
                  }
                >
                  Delete
                </button>
              </div>
            )}

            <hr />
          </div>
        ))}

        {/* INCOME */}
        <h3>Income</h3>

        {income.length === 0 && (
          <p>No income yet.</p>
        )}

        {income.map((item) => (
          <div key={item.id}>
            {editingId === item.id &&
            editingMode === "income" ? (
              <div>
                <input
                  type="number"
                  min="1"
                  step="any"
                  value={editAmount}
                  onChange={(e) =>
                    setEditAmount(e.target.value)
                  }
                />

                <select
                  value={editType}
                  onChange={(e) =>
                    setEditType(e.target.value)
                  }
                >
                  {Object.entries(incomeType).map(
                    ([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    )
                  )}
                </select>

                <button onClick={saveEdit}>
                  Save
                </button>

                <button onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <p>
                  Category: {incomeType[item.type]}
                </p>

                <p>
                  Amount: Rp
                  {item.amount.toLocaleString("id-ID")}
                </p>

                <button
                  onClick={() =>
                    startEdit(item, "income")
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteIncome(item.id)
                  }
                >
                  Delete
                </button>
              </div>
            )}

            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
