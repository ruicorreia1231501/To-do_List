import { useRef } from "react";
import type { Task } from "../types/Task";

interface Props {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onPreviewEnter: (task: Task) => void;
  onPreviewLeave: () => void;
}

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
  onPreviewEnter,
  onPreviewLeave,
}: Props) {
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      onPreviewEnter(task);
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    onPreviewLeave();
  };

  return (
    <li
      className={`task ${task.completed ? "completed" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="task-content" onClick={() => onEdit(task)}>
        <input
          type="checkbox"
          className="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="task-text">
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
        </div>
      </div>

      <button
        className="btn-delete"
        onClick={() => onDelete(task._id)}
        type="button"
      >
        <i className="far fa-trash-alt"></i>
      </button>
    </li>
  );
}
