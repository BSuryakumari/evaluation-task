import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import StatusFilter from "./components/StatusFilter";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/tasks"); // Replace with the actual backend API URL
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddOrEditTask = async (task) => {
    try {
      if (taskToEdit) {
        // Update task
        const response = await fetch(`/tasks/${taskToEdit.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task),
        });
        const updatedTask = await response.json();

        // Update the task in the state
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
        );
      } else {
        // Add new task
        const response = await fetch("/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task),
        });
        const newTask = await response.json();

        // Add the new task to the state
        setTasks((prevTasks) => [...prevTasks, newTask]);
      }

      // Close the form modal
      setTaskToEdit(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      try {
        await fetch(`/tasks/${id}`, { method: "DELETE" });
        // Remove the task from the state
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setShowForm(true);
  };

  const filteredTasks = tasks.filter((task) =>
    filteredStatus ? task.status === filteredStatus : true
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Tracker</h1>
        <button onClick={() => setShowForm(true)} className="add-task-btn">
          Add Task
        </button>
      </header>

      <div className="filter-container">
        <StatusFilter status={filteredStatus} onChange={setFilteredStatus} />
      </div>

      <TaskList
        tasks={filteredTasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />

      {showForm && (
        <TaskForm
          onSave={handleAddOrEditTask}
          taskToEdit={taskToEdit}
          onClose={() => {
            setShowForm(false);
            setTaskToEdit(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
