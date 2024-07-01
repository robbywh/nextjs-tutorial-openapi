'use server'
import { revalidatePath } from "next/cache";
import prisma from "./db";
import { redirect } from "next/navigation";
import {z} from 'zod';

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

export const createTaskCustom = async (prevState: any, formData: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const content = formData.get('content');
  const Task = z.object({
    content: z.string().min(5)
  });
  try {
    Task.parse({content});
    await prisma.task.create({
      data: {
        content,
      }
    })
    revalidatePath('/tasks')
    return { message: 'success' };
  } catch (error) {
    return { message: 'error' };
  }
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

export const getTask = async (id: string) => {
  return prisma.task.findUnique({
    where: {
      id
    }
  })
}

export const editTask = async (formData: any) => {
  const id = formData.get('id');
  const content = formData.get('content');
  const completed = formData.get('completed');

  await prisma.task.update({
    where: {
      id,
    },
    data: {
      content,
      completed: completed === 'on'
    }
  });
  redirect('/tasks')
}