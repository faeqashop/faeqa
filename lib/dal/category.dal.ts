import prisma from "../prisma";
import { Category } from "@prisma/client";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
    });
    return categories;
  } catch (error) {
    console.error("Database Error: Failed to fetch categories", error);
    throw new Error("Failed to fetch categories.");
  }
};

export const createCategory = async (data: {
  name: string;
  slug: string;
  description?: string;
}) => {
  try {
    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
      },
    });
    return category;
  } catch (error) {
    console.error("Database Error: Failed to create category", error);
    throw new Error("Failed to create category.");
  }
};