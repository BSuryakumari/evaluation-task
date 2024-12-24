import React from "react";

const StatusFilter = ({ status, onChange }) => {
  return (
    <select value={status} onChange={(e) => onChange(e.target.value)}>
      <option value="">All</option>
      <option value="Pending">Pending</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
    </select>
  );
};

export default StatusFilter;
