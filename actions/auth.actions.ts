"use server";

import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string;
  
  // Next.js এর নতুন নিয়মে cookies() এর আগে await দিতে হয়
  const cookieStore = await cookies();
  
  if (password === "admin123") { 
    cookieStore.set("admin_logged_in", "true", { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7 
    });
    return { success: true, message: "" }; 
  } else {
    return { success: false, message: "পাসওয়ার্ড ভুল হয়েছে!" };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_logged_in"); // await দেওয়ায় এখন আর delete-এও এরর দেবে না!
}