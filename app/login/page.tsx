"use client";

import { useState } from "react";
import { loginAction } from "../../actions/auth.actions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(formData: FormData) {
    const result = await loginAction(formData);
    if (result.success) {
      router.push("/admin"); // লগিন সফল হলে ড্যাশবোর্ডে নিয়ে যাবে
    } else {
      setError(result.message); // ভুল হলে মেসেজ দেখাবে
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-[#111] border border-[#FF3366]/30 p-8 rounded-xl w-full max-w-md shadow-[0_0_30px_rgba(255,51,102,0.1)]">
        <h1 className="text-3xl font-black text-white text-center mb-6">
          Admin <span className="text-[#FF3366]">Login</span>
        </h1>
        
        <form action={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              className="w-full border border-gray-800 rounded-md p-3 bg-black text-white outline-none focus:border-[#FF3366] transition-colors" 
              placeholder="Enter secret password" 
            />
          </div>
          
          {error && <p className="text-[#FF3366] text-sm font-bold">{error}</p>}
          
          <button type="submit" className="w-full bg-[#FF3366] text-white py-3 rounded-md font-bold hover:bg-[#e62e5c] transition-colors mt-4">
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}