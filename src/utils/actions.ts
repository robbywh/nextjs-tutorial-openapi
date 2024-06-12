'use server'
import { revalidatePath } from "next/cache";
import prisma from "./db";

export const getAllTasks = async () => {
  return prisma.task.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export const createTask = async (formData: any) => {
  const content = formData.get('content');
  await prisma.task.create({
    data: {
      content,
    }
  })
  revalidatePath('/tasks')
}

export const deleteTask = async (formData: any) => {
  const id = formData.get('id');
  await prisma.task.delete({
    where: {
      id
    }
  })
  revalidatePath('/tasks')
}