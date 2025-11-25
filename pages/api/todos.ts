import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = 1; // sementara statis dulu

  // GET
  if (req.method === "GET") {
    const todos = await prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(todos);
  }

  // POST
  if (req.method === "POST") {
    const { title } = req.body;
    const todo = await prisma.todo.create({
      data: { title, userId },
    });
    return res.status(201).json(todo);
  }

  // PUT
  if (req.method === "PUT") {
    const { id, completed } = req.body;
    const todo = await prisma.todo.update({
      where: { id },
      data: { completed },
    });
    return res.status(200).json(todo);
  }

  // DELETE
  if (req.method === "DELETE") {
    const id = Number(req.query.id);
    await prisma.todo.delete({ where: { id } });
    return res.status(204).end();
  }

  return res.status(405).json({ message: "Method not allowed" });
}
