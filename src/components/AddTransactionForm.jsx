import React from "react";

function AddTransactionForm({ postTransaction }) {
  function submitForm(e) {
    e.preventDefault();
    const { date, description, category, amount } = e.target.elements;
    const newTransaction = {
      date: date.value,
      description: description.value,
      category: category.value,
      amount: amount.value,
    };
    postTransaction(newTransaction);
    e.target.reset();
  }

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={submitForm}>
        <div className="inline fields">
          <input type="date" name="date" />
          <input type="text" name="description" placeholder="Description" />
          <input type="text" name="category" placeholder="Category" />
          <input type="number" name="amount" placeholder="Amount" step="0.01" />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
