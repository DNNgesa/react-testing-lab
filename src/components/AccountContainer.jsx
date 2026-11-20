import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/transactions")
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to fetch transactions");
        }
        return r.json();
      })
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error loading transactions:", error));
  }, []);

  function postTransaction(newTransaction) {
    fetch("http://localhost:6001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to add transaction");
        }
        return r.json();
      })
      .then((data) => setTransactions((prev) => [...prev, data]))
      .catch((error) => console.error("Error posting transaction:", error));
  }

  function onSort(selectedSort) {
    setSortBy(selectedSort);
  }

  const displayedTransactions = transactions
    .filter((transaction) => {
      const query = search.toLowerCase();
      return (
        transaction.description.toLowerCase().includes(query) ||
        transaction.category.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (!sortBy) return 0;
      return a[sortBy].localeCompare(b[sortBy]);
    });

  return (
    <div>
      <Search setSearch={setSearch} />
      <AddTransactionForm postTransaction={postTransaction} />
      <Sort onSort={onSort} />
      <TransactionsList transactions={displayedTransactions} />
    </div>
  );
}

export default AccountContainer;
