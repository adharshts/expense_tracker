import { useState } from "react";

function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({
      title: "",
      amount: "",
      type: "expense",
      category: "",
      date: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
      <input name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
      
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
      <input type="date" name="date" value={form.date} onChange={handleChange} />

      <button type="submit">Add</button>
    </form>
  );
}

export default TransactionForm;