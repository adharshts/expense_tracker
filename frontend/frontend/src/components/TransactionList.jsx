import TransactionItem from "./TransactionItem";

function TransactionList({ transactions, onDelete }) {
  return (
    <ul>
      {transactions.map(tx => (
        <TransactionItem key={tx.id} tx={tx} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TransactionList;