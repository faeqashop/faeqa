// components/admin/CategoryForm.tsx
"use client"; // এটি ব্রাউজারে চলবে, কারণ এতে ইউজার ফর্ম পূরণ করবে

import { useRef, useState } from "react";
import { addCategoryAction } from "../../actions/category.actions";

export default function CategoryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ফর্ম সাবমিট হলে এই ফাংশনটি কাজ করবে
  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setMessage("");
    
    // Server Action-কে কল করা হচ্ছে
    const result = await addCategoryAction(formData);
    
    if (result.success) {
      setMessage("✅ " + result.message);
      formRef.current?.reset(); // কাজ হয়ে গেলে ফর্মটি মুছে পরিষ্কার করে দেওয়া
    } else {
      setMessage("❌ " + (result.message || "Invalid input data."));
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-md">
      <h2 className="text-2xl font-bold text-black mb-6">Add New Category</h2>
      
      <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">Category Name</label>
          <input 
            type="text" 
            name="name" 
            required 
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-brand-pink text-black bg-white"
            placeholder="e.g. Premium Abaya"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">URL Slug</label>
          <input 
            type="text" 
            name="slug" 
            required 
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-brand-pink text-black bg-white"
            placeholder="e.g. premium-abaya"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">Description (Optional)</label>
          <textarea 
            name="description" 
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-brand-pink text-black bg-white"
            rows={3}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="bg-brand-black text-white font-bold py-2 px-4 rounded hover:bg-brand-pink transition-colors disabled:bg-gray-400 mt-2 cursor-pointer"
        >
          {loading ? "Saving..." : "Create Category"}
        </button>
        
        {message && <p className="mt-2 text-sm font-medium text-brand-pink">{message}</p>}
      </form>
    </div>
  );
}