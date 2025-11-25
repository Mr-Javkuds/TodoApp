// components/TodoList.tsx

import React, { useState, useEffect, useCallback, FormEvent } from "react";
import {
  Button,
  Input,
  Spinner,
  Checkbox,
  Card,
  CardHeader,
  CardBody,
} from "@heroui/react";
import { TrashIcon, PlusIcon } from "@heroicons/react/24/outline"; // Ikon yang tersedia

// Interface tidak perlu diubah, sudah benar
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // --- Logika CRUD ---
  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/todos");

      if (response.ok) {
        const data: Todo[] = await response.json();

        setTodos(data);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    setIsAdding(true);
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTodoTitle }),
      });

      if (response.ok) {
        const newTodo: Todo = await response.json();

        setTodos((prev) => [newTodo, ...prev]);
        setNewTodoTitle("");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleComplete = async (todo: Todo) => {
    const newCompletedStatus = !todo.completed;

    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo.id ? { ...t, completed: newCompletedStatus } : t,
      ),
    );

    try {
      const response = await fetch("/api/todos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: todo.id, completed: newCompletedStatus }),
      });

      if (!response.ok) {
        setTodos((prev) =>
          prev.map((t) =>
            t.id === todo.id ? { ...t, completed: !newCompletedStatus } : t,
          ),
        );
      }
    } catch (error) {
      console.error("Error toggling complete:", error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));

    try {
      const response = await fetch(`/api/todos?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        await fetchTodos();
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      await fetchTodos();
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="p-4 border-b">
        <h3 className="text-xl font-semibold">Daftar Tugas Anda</h3>
      </CardHeader>
      <CardBody className="p-6">
        {/* Input Form untuk Tambah Tugas */}
        <form className="flex gap-2 mb-6" onSubmit={handleAddTodo}>
          <Input
            className="flex-grow"
            placeholder="Tambahkan tugas baru..."
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
          <Button
            color="primary"
            disabled={!newTodoTitle.trim()}
            isLoading={isAdding}
            type="submit"
          >
            {isAdding ? (
              <Spinner size="sm" />
            ) : (
              <PlusIcon className="w-5 h-5 mr-1" />
            )}
            Tambah
          </Button>
        </form>

        {/* Loading State dan Daftar Tugas */}
        {loading && (
          <div className="flex justify-center items-center h-40">
            <Spinner color="primary" size="lg" />
            <span className="ml-2 text-gray-600">Memuat tugas...</span>
          </div>
        )}

        {!loading && (
          <div className="space-y-3">
            {todos.length === 0 ? (
              <p className="text-gray-500 text-center">
                Tidak ada tugas! Mari buat yang pertama.
              </p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center justify-between p-3 border rounded-lg transition-colors 
                              ${
                    todo.completed
                      ? "bg-green-50/50 border-green-200"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-center flex-grow">
                    <Checkbox
                      checked={todo.completed}
                      className="mr-3"
                      onChange={() => handleToggleComplete(todo)}
                    />
                    <span
                      className={`text-base ${
                        todo.completed
                          ? "line-through text-gray-500"
                          : "text-gray-900"
                      }`}
                    >
                      {todo.title}
                    </span>
                  </div>

                  {/* GANTI IconButton dengan button Tailwind biasa */}
                  <button
                    aria-label={`Hapus tugas: ${todo.title}`}
                    className="p-1 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
