# 📝 AI-Powered Todo App (with CopilotKit)

A **clean, functional, and AI-integrated Todo application** built with **React**, **Tailwind CSS**, and **CopilotKit**.  
This app allows users to manage tasks efficiently with local storage persistence and AI-assisted commands.

---

## 🎬 Live Preview
https://todo-aipowered-simple-jj.vercel.app/

## 🎬 Demo Preview

![AI Todo App Demo](https://raw.githubusercontent.com/Jagat05/todo_aipowered-simple/main/public/todoai.gif)

_(GIF preview of the app in action — showing add, edit, delete from AI )_

---

## 🚀 Features

- 🧠 **AI Integration (CopilotKit)** – Control your todos using natural language via Copilot actions.
- 🌗 **Dark/Light Mode** – Toggle between themes effortlessly.
- 📦 **Local Storage Support** – Your todos are stored locally, no account needed.
- ✏️ **Add, Edit, Delete, and Complete Todos** – Simple CRUD functionality.
- 🔍 **Search and Filter** – Find todos by text or filter by completion status.
- 🖱️ **Drag and Drop Reordering** – Rearrange todos easily.
- 💬 **Smart Copilot Actions:**
  - `addTodo` – Add a new todo
  - `deleteTodo` – Delete a todo by ID
  - `markTodoComplete` – Mark a todo as complete
  - `updateTodo` – Update the text of a todo

---

## 🛠️ Tech Stack

| Technology                            | Purpose                       |
| ------------------------------------- | ----------------------------- |
| **React**                             | Frontend UI                   |
| **Tailwind CSS**                      | Styling                       |
| **CopilotKit (react-core, react-ui)** | AI command integration        |
| **React Icons**                       | Icons (FiPlus, FiEdit2, etc.) |
| **LocalStorage**                      | Data persistence              |

---

---

## ⚙️ Setup & Installation

1. **Clone this repository**

   ```bash
   git clone https://github.com/Jagat05/todo_aipowered-simple.git
   cd todo_aipowered-simple
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the app**

   ```bash
   npm run dev
   ```

4. **Open in your browser**

---

## 💡 How AI Integration Works

This project uses **CopilotKit** to make your todos AI-readable and interactive.

### Example:

- You can tell the AI:
  > “Add a todo to study React tomorrow.”  
  > or  
  > “Update todo 1739021 with new text ‘Finish AI Todo project.’”

It uses:

```js
useCopilotReadable(); // Makes todos readable by AI
useCopilotAction(); // Defines actions like add, delete, update
```

---

## 👨‍💻 Author

**Developed by [Jagat Joshi](https://github.com/Jagat05)** ❤️

> _"Simple. Local. Smart."_

---
