import React from "react";

function Search({ setSearch }) {
  return (
    <div className="input-group input-group-lg shadow-sm mb-4">
      <span className="input-group-text bg-white border-end-0 text-muted">
        <i className="bi bi-search"></i>
      </span>
      <input
        type="text"
        className="form-control border-start-0 ps-0"
        placeholder="Search your Recent Transactions"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default Search;
