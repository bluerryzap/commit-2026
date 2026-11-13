import Hero from "../components/hero.jsx";
import { useState } from "react";
import { nanoid } from "nanoid";


// expense[n] = {amount: ...., type: ...., id....}
export default function Home() {
  const [expense, setExpense] = useState([]);
  const [income, setIncome] = useState([]);
  const [type, setType] = useState("food");
  const [transactionMode, setTransactionMode] = useState("expense");
  const [amount, setAmount] = useState("");

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

  const totalIncome = income.reduce((total, item) => {
    return total + item.amount;
  }, 0);

  const totalExpense = expense.reduce((total, item) => {
    return total + item.amount;
  }, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <h2>Add Transaction</h2>

        <label>Transaction Type</label>
        <select
          value={transactionMode}
          onChange={(e) => {
            const mode = e.target.value;
            setTransactionMode(mode);
            setType(mode === "expense" ? "food" : "allowance");
          }}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <label>Amount (Rp)</label>
        <input
          type="number"
          placeholder="Enter amount"
          min="1"
          step="any"
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
            transactionMode === "expense" ? expenseType : incomeType
          ).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <button type="submit">Add Transaction</button>
      </form>


      <div>
        <h2>Transaction History</h2>

        <h3>Expenses</h3>

        {expense.length === 0 ? (
          <p>No expenses yet.</p>
        ) : (
          expense.map((item) => (
            <div key={item.id}>
              <p>Category: {expenseType[item.type]}</p>
              <p>Amount: Rp{item.amount.toLocaleString("id-ID")}</p>
              <hr />
            </div>
          ))
        )}

        <h3>Income</h3>

        {income.length === 0 ? (
          <p>No income yet.</p>
        ) : (
          income.map((item) => (
            <div key={item.id}>
              <p>Category: {incomeType[item.type]}</p>
              <p>Amount: Rp{item.amount.toLocaleString("id-ID")}</p>
              <hr />
            </div>
          ))
        )}
      </div>


      <div className="financial-summary">
        <h2>Financial Summary</h2>

        <div className="balance">
          <h3>Current Balance</h3>
          <h1>Rp{balance.toLocaleString("id-ID")}</h1>
        </div>

        <div className="total-income">
          <h3>Total Income</h3>
          <p>+Rp{totalIncome.toLocaleString("id-ID")}</p>
        </div>

        <div className="total-expense">
          <h3>Total Expenses</h3>
          <p>-Rp{totalExpense.toLocaleString("id-ID")}</p>
        </div>
      </div>


    </div>
  );
}
