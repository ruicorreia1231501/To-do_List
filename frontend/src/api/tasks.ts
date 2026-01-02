import type { Task } from "../types/Task";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:4200"}/tasks`;

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createTask(data: Partial<Task>): Promise<Task> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// PUT
export async function updateTask(
  id: string,
  data: Partial<Task>
): Promise<Task> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// PATCH 
export async function partialUpdateTask(
  id: string,
  data: Partial<Task>
): Promise<Task> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}
