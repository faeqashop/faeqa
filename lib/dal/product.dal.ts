import prisma from "../prisma";

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true, // প্রোডাক্টের সাথে ক্যাটাগরির নামও নিয়ে আসার জন্য
      },
      orderBy: {
        createdAt: 'desc', // নতুন যোগ করা প্রোডাক্টগুলো লিস্টের ওপরে দেখাবে
      },
    });
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}