function Sort({ onSort }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <span className="fw-semibold text-muted small">
        <i className="bi bi-list-ul me-1"></i> Transaction History
      </span>
      <div className="d-flex align-items-center gap-2">
        <label className="small text-muted mb-0">Sort by:</label>
        <select
          className="form-select form-select-sm w-auto shadow-sm"
          onChange={(e) => {
            onSort(e.target.value);
          }}
        >
          <option value={"description"}>Description</option>
          <option value={"category"}>Category</option>
        </select>
      </div>
    </div>
  );
}
export default Sort;
