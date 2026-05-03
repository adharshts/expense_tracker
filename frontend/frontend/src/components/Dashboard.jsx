function Dashboard({ income, expense, balance }) {
  return (
    <div className="dashboard">
      <h2>Balance: ₹{balance}</h2>

      <div className="summary">
        <div className="income">Income: ₹{income}</div>
        <div className="expense">Expense: ₹{expense}</div>
      </div>
    </div>
  );
}

export default Dashboard;