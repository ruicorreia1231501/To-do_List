# Full Stack To-do List

Repository following the It's Possible Tech interview challenge.

# Installing and Running


# Backend Development

## 1. Endpoint Definition

| Method | URI          | Action                          |
| ------ | ------------ | ------------------------------- |
| GET    | `/tasks`     | List tasks                      |
| GET    | `/tasks/:id` | Get task                        |
| POST   | `/tasks`     | Create task                     |
| PUT    | `/tasks/:id` | Edit task                       |
| PATCH  | `/tasks/:id` | Partial update (e.g: completed) |
| DELETE | `/tasks/:id` | Delete task                     |


## 2. Model Definition

Task {
    title: String,
    description: String (optional),
    targetDate: Date (optional),
    priority: Integer (optional: 1 - 5),
    completed: Boolean,
    createdDate: Date,
    updatedDate: Date
}
