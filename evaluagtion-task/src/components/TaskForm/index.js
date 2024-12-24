import React, { useState } from "react";
import "./index.css";

const TaskForm = ({ onSave, taskToEdit, onClose }) => {
  const [task, setTask] = useState(
    taskToEdit || {
      name: "",
      description: "",
      dueDate: "",
      status: "Pending",
      priority: "Medium",
    }
  );

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task);
    onClose();
  };

  return (
    <div className="task-form-modal">
      <div className="task-form-container">
        <h2>{taskToEdit ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={task.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              required
            ></textarea>
          </label>
          <label>
            Due Date:
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Status:
            <select name="status" value={task.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
          <label>
            Priority:
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
          <button type="submit" className="save-btn">
            Save
          </button>
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
