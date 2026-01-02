import { useState } from "react";
import type { Task } from "../types/Task";

interface Props {
  onAdd: (task: Partial<Task>) => void;
}

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(3);
  const [targetDate, setTargetDate] = useState("");
  const [error, setError] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title cannot be empty");
      return;
    }

    const taskData: Partial<Task> = { title: title.trim() };
    
    if (description.trim()) {
      taskData.description = description.trim();
    }
    if (targetDate) {
      taskData.targetDate = targetDate;
    }
    if (priority) {
      taskData.priority = priority;
    }

    onAdd(taskData);
    setTitle("");
    setDescription("");
    setPriority(3);
    setTargetDate("");
    setShowAdvanced(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <form onSubmit={submit} className="form">
      <label>Add a new todo...</label>
      {error && <div className="error">{error}</div>}
      
      <div className="form-title-row">
        <input
          type="text"
          value={title}
          onChange={handleInputChange}
          placeholder="Task title..."
          className="input"
        />
        <button
          type="button"
          className="btn-toggle-advanced"
          onClick={() => setShowAdvanced(!showAdvanced)}
          title={showAdvanced ? "Hide optional fields" : "Show optional fields"}
        >
          <i className={`fas fa-chevron-${showAdvanced ? "down" : "right"}`}></i>
        </button>
      </div>

      {showAdvanced && (
        <div className="form-advanced">
          <div className="form-group">
            <label htmlFor="description">Description (optional)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description..."
              className="input"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority (1-5)</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(parseInt(e.target.value))}
              className="select"
            >
              <option value="1">Low</option>
              <option value="2">Low-Medium</option>
              <option value="3">Medium</option>
              <option value="4">Medium-High</option>
              <option value="5">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="targetDate">Target Date (optional)</label>
            <input
              id="targetDate"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="input"
            />
          </div>
        </div>
      )}

      <div style={{ textAlign: "center" }}>
        <button type="submit" className="btn-add">
          Add Task
        </button>
      </div>
    </form>
  );
}
