import { useEffect, useState } from "react";
import type { Task } from "./types/Task";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskEditModal from "./components/TaskEditModal";
import TaskPreview from "./components/TaskPreview";
import "./App.css";
import {
  getTasks,
  createTask,
  updateTask,
  partialUpdateTask,
  deleteTask,
} from "./api/tasks";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [previewTask, setPreviewTask] = useState<Task | null>(null);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const addTask = async (data: Partial<Task>) => {
    const newTask = await createTask(data);
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = async (task: Task) => {
    const updated = await partialUpdateTask(task._id, {
      completed: !task.completed,
    });
    setTasks((prev) =>
      prev.map((t) => (t._id === updated._id ? updated : t))
    );
  };

  const removeTask = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const editTask = (task: Task) => {
    setEditingTask(task);
  };

  const saveEditedTask = async (updated: Partial<Task>) => {
    if (!editingTask) return;
    const result = await updateTask(editingTask._id, updated);
    setTasks((prev) =>
      prev.map((t) => (t._id === result._id ? result : t))
    );
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    // added search bar for future implementation
    <div className="app">
      <header className="text-center my-4">
        <h1>Todo List</h1>
        
        <div className="search-container"> 
          <input
            type="text"
            className="search-input"
            placeholder="Click on a Task to Edit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled
          />
        </div>
      </header>

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={removeTask}
        onEdit={editTask}
        onPreviewEnter={setPreviewTask}
        onPreviewLeave={() => setPreviewTask(null)}
      />

      <TaskForm onAdd={addTask} />

      {previewTask && (
        <div className="task-preview-container">
          <TaskPreview task={previewTask} />
        </div>
      )}

      {editingTask && (
        <TaskEditModal
          task={editingTask}
          onSave={saveEditedTask}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}

export default App;
