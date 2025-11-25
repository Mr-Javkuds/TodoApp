"use client";
import React, { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Checkbox } from "@heroui/checkbox";
import { Divider } from "@heroui/divider";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  todos?: Todo[];
  onAdd: (title: string) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoList({ todos = [], onAdd, onToggle, onDelete }: TodoListProps) {
  const [title, setTitle] = useState("");

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="flex justify-between items-center gap-4">
        <Input
          label="Tambah todo"
          placeholder="Contoh: Ngoding sampe lupa mandi"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && title.trim() && onAdd(title.trim())}
        />
        <Button
          color="primary"
          onPress={() => {
            if (!title.trim()) return;
            onAdd(title.trim());
            setTitle("");
          }}
        >
          Tambah
        </Button>
      </CardHeader>

      <Divider />

      <CardBody className="gap-4">
        {todos.length === 0 && (
          <p className="text-center text-gray-500">
            Belum ada todo — hidup kamu tentram banget ya 😎
          </p>
        )}

        {todos.map((todo) => (
          <div key={todo.id} className="flex justify-between items-center gap-3">
            <Checkbox
              isSelected={todo.completed}
              onValueChange={() => onToggle(todo.id)}
            >
              {todo.title}
            </Checkbox>

            <Button color="danger" variant="light" onPress={() => onDelete(todo.id)}>
              Hapus
            </Button>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
