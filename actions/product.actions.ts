"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

export async function addProductAction(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const categoryId = formData.get("categoryId") as string;
    const file = formData.get("image") as File | null;

    if (!name || !slug || !price || !categoryId) {
      return { success: false, message: "Please fill all required fields." };
    }

    let imageUrl = null;

    // ছবি সেভ করার লজিক (ফোল্ডার না থাকলে নিজে বানিয়ে নেবে)
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uploadDir = path.join(process.cwd(), "public/uploads");
      
      // যদি uploads ফোল্ডার না থাকে, তবে কোড নিজেই তৈরি করে নেবে
      if (!fs.existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const filePath = path.join(uploadDir, fileName);
      
      await writeFile(filePath, buffer);
      imageUrl = `/uploads/${fileName}`; 
    }

    // ডাটাবেসে সেভ করা
    await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        categoryId,
        imageUrl,
      },
    });
    
    revalidatePath("/admin");
    return { success: true, message: "Product created successfully!" };

  } catch (error: any) {
    console.error("Backend Error:", error);
    // এবার কোনো এরর হলে সেটি ফর্মের নিচেই লাল লেখায় দেখাবে
    return { success: false, message: `Error: ${error.message}` };
  }
}

export async function deleteProductAction(formData: FormData) {
  const id = formData.get("id") as string; 
  try {
    await prisma.product.delete({
      where: { id: id },
    });
    revalidatePath("/admin"); 
  } catch (error) {
    console.error("Failed to delete product:", error);
  }
}