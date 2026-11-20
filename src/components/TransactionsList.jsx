import React from "react";
import Transaction from "./Transaction";

function TransactionsList({ transactions }) {
  const transactionComponent = transactions.map((transaction) => {
    return <Transaction key={transaction.id} transaction={transaction} />;
  });

  return (
    <div className="card border-0 shadow-sm overflow-hidden">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th className="text-end">Amount</th>
            </tr>
          </thead>
          <tbody>{transactionComponent}</tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionsList;
