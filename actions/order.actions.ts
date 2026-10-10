"use server";

import prisma from "../lib/prisma";

export async function createOrderAction(formData: FormData) {
  try {
    const productId = formData.get("productId") as string;
    const productPrice = parseFloat(formData.get("productPrice") as string);
    
    const customerName = formData.get("customerName") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const deliveryArea = formData.get("deliveryArea") as string;

    if (!customerName || !phone || !address || !deliveryArea) {
      return { success: false, message: "Please fill all required fields." };
    }

    // ডেলিভারি চার্জ হিসাব করা
    const deliveryFee = deliveryArea === "Inside Dhaka" ? 80 : 130;
    const totalPrice = productPrice + deliveryFee;

    // ডাটাবেসে অর্ডার সেভ করা
    await prisma.order.create({
      data: {
        productId,
        customerName,
        phone,
        address,
        deliveryArea,
        deliveryFee,
        totalPrice,
      },
    });

    return { success: true, message: "অর্ডারটি সফলভাবে সম্পন্ন হয়েছে!" };
  } catch (error: any) {
    console.error("Order Error:", error);
    return { success: false, message: "অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।" };
  }
}import { revalidatePath } from "next/cache";

export async function updateOrderStatusAction(orderId: string, newStatus: string) {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });
    revalidatePath("/admin/orders"); // পেজটি সাথে সাথে রিফ্রেশ করার জন্য
    return { success: true };
  } catch (error) {
    console.error("Status Update Error:", error);
    return { success: false };
  }
}