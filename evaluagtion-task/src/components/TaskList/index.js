import React from "react";
import "./index.css";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="task-list">
      <table className="task-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>{new Date(task.dueDate).toLocaleDateString()}</td>
              <td>{task.status}</td>
              <td>{task.priority}</td>
              <td>
                <button onClick={() => onEdit(task)}>Edit</button>
                <button onClick={() => onDelete(task.id)} className="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
