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
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">
        <h3 className="h6 fw-bold text-uppercase text-muted mb-3">
          <i className="bi bi-plus-circle-fill text-primary me-2"></i>
          Record New Transaction
        </h3>
        <form onSubmit={submitForm}>
          <div className="row g-3 align-items-center">
            <div className="col-md-2">
              <input type="date" name="date" className="form-control" />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                name="description"
                placeholder="Description"
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                name="category"
                placeholder="Category"
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                step="0.01"
                className="form-control"
              />
            </div>
          </div>
          <div className="mt-3 text-end">
            <button className="btn btn-primary px-4 fw-semibold" type="submit">
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTransactionForm;
