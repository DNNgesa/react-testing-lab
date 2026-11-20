import React from "react";

function Transaction({ transaction }) {
  const isPositive = Number(transaction.amount) >= 0;

  return (
    <tr>
      <td className="text-muted small">{transaction.date}</td>
      <td className="fw-semibold">{transaction.description}</td>
      <td>
        <span className="badge bg-secondary-subtle text-dark">
          {transaction.category}
        </span>
      </td>
      <td
        className={`text-end fw-bold ${
          isPositive ? "text-success" : "text-danger"
        }`}
      >
        {transaction.amount}
      </td>
    </tr>
  );
}

export default Transaction;
