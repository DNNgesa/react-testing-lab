import React from "react";
import AccountContainer from "./AccountContainer";

function App() {
  return (
    <div className="bg-light min-vh-100 pb-5">
      <header className="bg-dark text-white py-4 mb-4 shadow-sm border-bottom border-primary border-4">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-primary text-white rounded-3 p-2 d-flex align-items-center justify-content-center">
              <i className="bi bi-bank2 fs-4"></i>
            </div>
            <div>
              <h2 className="h4 fw-bold mb-0">The Royal Bank of Flatiron</h2>
              <small className="text-secondary">
                Personal Expenditure & Transaction Ledger
              </small>
            </div>
          </div>
          <span className="badge bg-primary-subtle text-primary-emphasis px-3 py-2 rounded-pill">
            <i className="bi bi-shield-check me-1"></i> Verified Account
          </span>
        </div>
      </header>

      <main className="container">
        <AccountContainer />
      </main>
    </div>
  );
}

export default App;
