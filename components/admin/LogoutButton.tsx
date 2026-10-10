"use client";

import { logoutAction } from "../../actions/auth.actions";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await logoutAction();
    router.push("/login"); // লগআউট হওয়ার পর লগিন পেজে পাঠিয়ে দেবে
  }

  return (
    <button 
      onClick={handleLogout}
      className="bg-gray-200 text-gray-800 px-5 py-3 rounded-lg font-bold hover:bg-red-100 hover:text-red-600 transition-colors"
    >
      Logout
    </button>
  );
}