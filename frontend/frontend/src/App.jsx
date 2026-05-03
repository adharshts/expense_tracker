import { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Dashboard from "./components/Dashboard";
import Chart from "./components/Chart";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [showLogin, setShowLogin] = useState(true);
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  // 📊 Calculations
  const income = transactions
    .filter(tx => tx.type && tx.type.toLowerCase() === "income")
    .reduce((acc, tx) => acc + Number(tx.amount), 0);

  const expense = transactions
    .filter(tx => tx.type && tx.type.toLowerCase() === "expense")
    .reduce((acc, tx) => acc + Number(tx.amount), 0);

  const balance = income - expense;

  // 🚀 Fetch transactions
  useEffect(() => {
    if (!token) {
      console.log("No token found");
      return;
    }

    fetch("http://localhost:5000/transactions", {
      headers: {
        Authorization: token
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then(data => setTransactions(data))
      .catch(err => console.log(err));
  }, [token]);

  // ➕ Add transaction (FIXED)
  const addTransaction = (data) => {
    fetch("http://localhost:5000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(newTx => setTransactions([...transactions, newTx]));
  };

  // ❌ Delete transaction (FIXED)
  const deleteTransaction = (id) => {
    fetch(`http://localhost:5000/transactions/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token
      }
    }).then(() => {
      setTransactions(transactions.filter(tx => tx.id !== id));
    });
  };

  return (
    <div className="container">
      {!isLoggedIn ? (
        showLogin ? (
          <Login setIsLoggedIn={setIsLoggedIn} setShowLogin={setShowLogin} />
        ) : (
          <Register setShowLogin={setShowLogin} />
        )
      ) : (
        <>
          <h1>Expense Tracker</h1>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
            }}
          >
            Logout
          </button>

          <Dashboard income={income} expense={expense} balance={balance} />
          <Chart transactions={transactions} />
          <TransactionForm onAdd={addTransaction} />
          <TransactionList
            transactions={transactions}
            onDelete={deleteTransaction}
          />
        </>
      )}
    </div>
  );
}

export default App;