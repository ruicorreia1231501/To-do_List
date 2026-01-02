import { useState } from "react";
import type { Task } from "../types/Task";

interface Props {
  task: Task;
  onSave: (updated: Partial<Task>) => void;
  onCancel: () => void;
}

export default function TaskEditModal({ task, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority || 3);
  const [targetDate, setTargetDate] = useState(task.targetDate?.split("T")[0] || "");

  const handleSave = async () => {
    if (title.trim() === "") {
      alert("Title cannot be empty");
      return;
    }
    await onSave({
      title: title.trim(),
      description: description.trim() || undefined,
      priority: parseInt(String(priority)),
      targetDate: targetDate || undefined,
    });
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Task</h2>
          <button
            className="btn-close"
            onClick={onCancel}
            type="button"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description (optional)"
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority (1-5)</label>
            <select
              id="priority"
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(parseInt(e.target.value))}
            >
              <option value="1">Low</option>
              <option value="2">Low-Medium</option>
              <option value="3">Medium</option>
              <option value="4">Medium-High</option>
              <option value="5">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="targetDate">Target Date</label>
            <input
              id="targetDate"
              type="date"
              className="form-input"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            type="button"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
