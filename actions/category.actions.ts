"use server";

import { revalidatePath } from "next/cache";
import { categorySchema } from "../lib/validations/category.schema";
import prisma from "../lib/prisma";

// ১. ক্যাটাগরি তৈরি করার ফাংশন
export async function addCategoryAction(formData: FormData) {
  const rawData = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
  };

  const validatedData = categorySchema.safeParse(rawData);

  if (!validatedData.success) {
    return { success: false, message: "Invalid form data" };
  }

  try {
    await prisma.category.create({
      data: {
        name: validatedData.data.name,
        slug: validatedData.data.slug,
        description: validatedData.data.description,
      },
    });
    
    revalidatePath("/admin"); // পেজ রিফ্রেশ করে নতুন ডাটা দেখানোর জন্য
    return { success: true, message: "Category created successfully!" };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, message: "Failed to create category in database." };
  }
}

// ২. ক্যাটাগরি ডিলিট করার ফাংশন (আপডেট করা হয়েছে)
export async function deleteCategoryAction(formData: FormData) {
  const id = formData.get("id") as string; // ফর্মের hidden input থেকে ID নেওয়া হলো

  try {
    await prisma.category.delete({
      where: {
        id: id,
      },
    });
    
    revalidatePath("/admin"); // ডিলিট করার পর পেজ আপডেট হবে
  } catch (error) {
    console.error("Failed to delete category:", error);
  }
}