function TransactionItem({ tx, onDelete }) {
  return (
    <li className={tx.type}>
      {tx.title} - ₹{tx.amount}
      <button onClick={() => onDelete(tx.id)}>❌</button>
    </li>
  );
}

export default TransactionItem;