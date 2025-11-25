"use client";
import React, { useEffect, useState } from "react";
import TodoList from "@/components/TodoList";
import DefaultLayout from "@/layouts/default";
import { HeroUIProvider } from "@heroui/system";

interface UITodo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function DashboardPage() {
  const [todos, setTodos] = useState<UITodo[]>([
    { id: 1, title: "Belajar Prisma", completed: false, userId: 1, createdAt: new Date(), updatedAt: new Date() },
    { id: 2, title: "Beli kopi", completed: true, userId: 1, createdAt: new Date(), updatedAt: new Date() },
  ]);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data: UITodo[]) => setTodos(data));
  }, []);

  const handleAddTodo = async (title: string) => {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    const newTodo: UITodo = await res.json();
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const res = await fetch("/api/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed: !todo.completed }),
    });

    const updated: UITodo = await res.json();
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const handleDeleteTodo = async (id: number) => {
    await fetch(`/api/todos?id=${id}`, { method: "DELETE" });
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <DefaultLayout>
      <HeroUIProvider>
        <div className="w-full max-w-4xl mx-auto py-10">
          <h1 className="text-4xl font-bold text-center mb-8">Dashboard</h1>
          <TodoList
            todos={todos}
            onAdd={handleAddTodo}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        </div>
      </HeroUIProvider>
    </DefaultLayout>
  );
}
