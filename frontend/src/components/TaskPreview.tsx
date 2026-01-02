import type { Task } from "../types/Task";

interface Props {
  task: Task;
}

export default function TaskPreview({ task }: Props) {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Sem data";
    return new Date(dateStr).toLocaleDateString("pt-PT", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getPriorityLabel = (priority?: number) => {
    const levels = ["", "Low", "Low-Medium", "Medium", "Medium-High", "High"];
    return levels[priority || 3] || "Medium";
  };

  return (
    <div className="task-preview">
      <div className="preview-section">
        <span className="preview-label">Title:</span>
        <span className="preview-value">{task.title}</span>
      </div>

      <div className="preview-section">
        <span className="preview-label">Priority:</span>
        <span className="preview-value">{getPriorityLabel(task.priority)}</span>
      </div>

      {task.targetDate && (
        <div className="preview-section">
          <span className="preview-label">Due:</span>
          <span className="preview-value">{formatDate(task.targetDate)}</span>
        </div>
      )}

      {task.completed && (
        <div className="preview-section">
          <span className="preview-label">Status:</span>
          <span className="preview-value">✓ Completed</span>
        </div>
      )}

      {task.description && (
        <div className="preview-section">
          <span className="preview-label">Notes:</span>
          <p className="preview-value preview-description">{task.description}</p>
        </div>
      )}
    </div>
  );
}
