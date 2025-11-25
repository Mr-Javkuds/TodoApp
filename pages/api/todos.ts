// pages/api/todos.ts


import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@/lib/generated/prisma/client";
 // Import sebagai Named Export
const prisma = new PrismaClient(); // Menggunakan 'new' pada apa yang mungkin bukan class

// 2. Definisikan tipe untuk request body (opsional, tapi disarankan)
interface UpdateBody {
  id: number;
  completed: boolean;
}

interface CreateBody {
  title: string;
}

// 3. Gunakan tipe NextApiRequest dan NextApiResponse
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Asumsi otentikasi
  const userId = 1;

  if (req.method === 'GET') {
    // READ
    try {
      const todos = await prisma.todo.findMany({
        where: { userId: userId },
        orderBy: { createdAt: 'desc' },
      });
      // 4. Pastikan response sesuai dengan tipe data Todo (meskipun inferensi sudah dilakukan)
      return res.status(200).json(todos);
    } catch (error) {
      console.error('Gagal mengambil todos:', error);
      return res.status(500).json({ message: 'Gagal mengambil todos' });
    }
  } else if (req.method === 'POST') {
    // CREATE
    const { title } = req.body as CreateBody; // Cast ke CreateBody
    if (!title) {
      return res.status(400).json({ message: 'Title wajib diisi' });
    }

    try {
      const newTodo = await prisma.todo.create({
        data: {
          title,
          userId: userId,
        },
      });
      return res.status(201).json(newTodo);
    } catch (error) {
      console.error('Gagal membuat todo:', error);
      return res.status(500).json({ message: 'Gagal membuat todo' });
    }
  } else if (req.method === 'PUT') {
    // UPDATE
    // Ambil data dan pastikan id adalah number dan completed adalah boolean
    const { id, completed } = req.body as UpdateBody;

    if (!id || typeof completed !== 'boolean') {
      return res
        .status(400)
        .json({ message: 'ID dan status completed wajib diisi' });
    }

    // Perhatikan: Karena req.body dikirim sebagai JSON, id adalah number di sini,
    // tetapi jika diambil dari query, id harus diubah ke Int: parseInt(id as string).

    try {
      const updatedTodo = await prisma.todo.update({
        where: { id: id }, // ID sudah number
        data: { completed },
      });
      return res.status(200).json(updatedTodo);
    } catch (error) {
      console.error('Gagal memperbarui todo:', error);
      return res.status(500).json({ message: 'Gagal memperbarui todo' });
    }
  } else if (req.method === 'DELETE') {
    // DELETE
    // Ambil id dari query, harus di-cast ke string atau string[]
    const idQuery = req.query.id as string;

    if (!idQuery) {
      return res.status(400).json({ message: 'ID wajib diisi' });
    }

    const id = parseInt(idQuery);

    try {
      await prisma.todo.delete({
        where: { id: id },
      });
      return res.status(204).end();
    } catch (error) {
      console.error('Gagal menghapus todo:', error);
      return res.status(500).json({ message: 'Gagal menghapus todo' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}