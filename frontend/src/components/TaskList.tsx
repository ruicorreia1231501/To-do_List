import type { Task } from "../types/Task";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onPreviewEnter: (task: Task) => void;
  onPreviewLeave: () => void;
}

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
  onPreviewEnter,
  onPreviewLeave,
}: Props) {
  if (tasks.length === 0) {
    return <p className="empty">No tasks yet. Add one below!</p>;
  }

  return (
    <ul className="tasks">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onPreviewEnter={onPreviewEnter}
          onPreviewLeave={onPreviewLeave}
        />
      ))}
    </ul>
  );
}
