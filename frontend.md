# Frontend Documentation

## Overview

The frontend is a React-based single-page application built with **TypeScript** and **Vite**.
It provides a user interface for task management, communicating with the backend API via HTTP requests.

## App Creation

Used the following command to generate the template files for future editing:
```bash
npm create vite@latest frontend -- --template react-ts
```

## Core Components

### App.tsx
**Purpose**: Main application component managing global task state and API integration.

**Functions**:
- `getTasks()`: Fetches all tasks from API on mount
- `handleAddTask()`: Creates new task via POST request
- `handleToggle()`: Updates task completion status via PATCH request
- `handleDelete()`: Removes task via DELETE request

### TaskForm.tsx
**Purpose**: Form component for creating new tasks.

### TaskList.tsx
**Purpose**: Container component for rendering task items.

### TaskItem.tsx
**Purpose**: Individual task display and interaction component.

## API Integration

### tasks.ts (API Client)

**Configuration**:
```typescript
const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:4200"}/tasks`;
```

**Endpoints**:
- `GET /tasks` - Retrieve all tasks
- `POST /tasks` - Create new task
- `PATCH /tasks/:id` - Update task completion status
- `DELETE /tasks/:id` - Delete task

**Error Handling**:
- Network errors are caught and propagated to UI
- Invalid JSON responses are handled gracefully

## Type Safety

### Task.ts

```typescript
export interface Task {
  _id: string;
  title: string;
  description?: string;
  priority?: number;
  targetDate?: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

## Styling

### Theme
- **Background**: Solarized dark (`#1e1410`)
- **Primary Color**: Solarized orange (`#cb4b16`)
- **Accent Color**: Light gray (`#93a1a1`)
- **Font**: Josefin Sans (Google Fonts)

## Vite Configuration

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',      // Expose to all interfaces
    port: 5173,            // Standard Vite port
    strictPort: false,
  },
})
```

## Docker Configuration

**Dockerfile**:
- Base image: `node:22-alpine`
- Installs dependencies via `npm install`
- Exposes port 5173 for the SPA
- Runs development server with `npm run dev`

**Build & Run**:
```bash
docker build -t todo-frontend .
docker run -p 5173:5173 -v $(pwd):/app -v /app/node_modules todo-frontend
```

## Features

### Task Management
1. **Create**: Add new tasks with title validation
2. **Read**: Display all tasks from database
3. **Update**: Toggle task completion status
4. **Delete**: Remove tasks permanently

### User Experience
- Real-time task list updates
- Input validation with error feedback
- Loading state during API calls
- Error messages displayed prominently
- Responsive design for various screen sizes

## Integration with Backend

The frontend communicates with the backend via HTTP requests at port 4200. Docker Compose networking enables service-to-service communication using container service names (`backend:4200` from within, `localhost:4200` from host browser).

## Dependencies

- `react`: UI framework
- `@vitejs/plugin-react`: Vite plugin for React
- `typescript`: Type safety
- Font Awesome: Icons via CDN
- Google Fonts: Font delivery via CDN
