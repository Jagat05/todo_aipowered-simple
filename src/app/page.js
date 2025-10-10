"use client";

import { CopilotPopup } from "@copilotkit/react-ui";
import React, { useEffect, useRef, useState } from "react";
import {
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiSearch,
  FiSun,
  FiMoon,
} from "react-icons/fi";

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(false);
  const inputRef = useRef(null);

  // Load todos from localStorage once on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("jj_todos_v1");
      if (stored) setTodos(JSON.parse(stored));
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("jj_todos_v1", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (editingId !== null) inputRef.current?.focus();
  }, [editingId]);

  const addOrUpdateTodo = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;

    if (editingId) {
      setTodos((prev) =>
        prev.map((t) =>
          t.id === editingId ? { ...t, text: value, editedAt: Date.now() } : t
        )
      );
      setEditingId(null);
    } else {
      const newTodo = {
        id: Date.now().toString(),
        text: value,
        completed: false,
        createdAt: Date.now(),
      };
      setTodos((prev) => [newTodo, ...prev]);
    }
    setText("");
  };

  const startEdit = (id) => {
    const t = todos.find((x) => x.id === id);
    if (t) {
      setText(t.text);
      setEditingId(id);
    }
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const updateOrder = (dragIndex, dropIndex) => {
    setTodos((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(dragIndex, 1);
      copy.splice(dropIndex, 0, moved);
      return copy;
    });
  };

  const onDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", String(index));
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e, index) => {
    e.preventDefault();
    const dragIndex = Number(e.dataTransfer.getData("text/plain"));
    if (Number.isFinite(dragIndex)) updateOrder(dragIndex, index);
  };

  const filtered = todos
    .filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    })
    .filter((t) => t.text.toLowerCase().includes(query.toLowerCase()));

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${
        dark ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Todo — Clean & Functional
            </h1>
            <p className="mt-1 text-sm opacity-70">
              Fast, local, and keyboard friendly.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                aria-label="Search todos"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-xl border focus:outline-none shadow-sm bg-transparent"
                placeholder="Search..."
              />
              <FiSearch className="absolute left-2 top-2 text-lg opacity-60" />
            </div>

            <button
              onClick={() => setDark((d) => !d)}
              className="p-2 rounded-lg border shadow-sm hover:scale-105 transition-transform"
              aria-label="Toggle theme"
            >
              {dark ? <FiSun /> : <FiMoon />}
            </button>
          </div>
        </header>

        {/* Main */}
        <main className="bg-white dark:bg-slate-800 dark:text-slate-100 rounded-2xl shadow p-6">
          {/* Input */}
          <form onSubmit={addOrUpdateTodo} className="flex gap-3 items-start">
            <textarea
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={editingId ? "Edit todo..." : "Write a new todo..."}
              className="flex-1 min-h-[56px] resize-none p-3 rounded-lg border focus:ring bg-transparent"
            />
            <button
              type="submit"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
            >
              <FiPlus /> {editingId ? "Update" : "Add"}
            </button>
          </form>

          {/* Filters */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              {["all", "active", "completed"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    filter === f ? "bg-indigo-600 text-white" : "border"
                  }`}
                >
                  {f[0].toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm opacity-70">
                {todos.filter((t) => !t.completed).length} left
              </span>
              <button
                onClick={clearCompleted}
                className="px-3 py-1 rounded-full border text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Clear completed
              </button>
            </div>
          </div>

          {/* Todo List */}
          <ul className="mt-6 space-y-3">
            {filtered.length === 0 ? (
              <li className="text-center py-8 opacity-70">
                No todos yet — try adding one!
              </li>
            ) : (
              filtered.map((t, i) => (
                <li
                  key={t.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, i)}
                  onDragOver={onDragOver}
                  onDrop={(e) => onDrop(e, i)}
                  className="flex items-center gap-3 p-3 rounded-xl border hover:shadow-sm bg-slate-50 dark:bg-slate-700"
                >
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleComplete(t.id)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <div
                      className={`truncate ${
                        t.completed ? "line-through opacity-60" : ""
                      }`}
                    >
                      {t.text}
                    </div>
                    <div className="text-xs opacity-60 mt-1">
                      {new Date(t.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEdit(t.id)}
                      className="p-2 rounded-md border hover:bg-slate-100 dark:hover:bg-slate-600"
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => removeTodo(t.id)}
                      className="p-2 rounded-md border hover:bg-slate-100 dark:hover:bg-slate-600"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>

          {/* Footer */}
          <footer className="mt-6 text-sm opacity-70 text-center">
            Made By Jagat Joshi❤️ — Local-only, no accounts required.
          </footer>
        </main>
      </div>
      <CopilotPopup
        instructions={
          "You are assisting the user as best as you can. Answer in the best way possible given the data you have."
        }
        labels={{
          title: "Jymes Assistent",
          initial: "Need any help?",
        }}
      />
    </div>
  );
}
