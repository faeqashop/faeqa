"use client";

import { useState, useRef } from "react";
import { addProductAction } from "../../actions/product.actions";

export default function ProductForm({ categories }: { categories: any[] }) {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null); 

  async function handleSubmit(formData: FormData) {
    const result = await addProductAction(formData);
    setMessage(result.message);
    setIsSuccess(result.success);
    
    if (result.success) {
      formRef.current?.reset();
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold text-black mb-6">Add New Product</h2>
      
      <form ref={formRef} action={handleSubmit} className="space-y-4">
        
        {/* ছবি আপলোডের বাটন */}
        <div>
          <label className="block text-sm font-bold text-gray-700">Product Image</label>
          <input 
            type="file" 
            name="image" 
            accept="image/*" 
            required 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#FF3366] file:text-white hover:file:bg-[#e62e5c]" 
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700">Product Name</label>
          <input type="text" name="name" required className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black" placeholder="e.g. Black Premium Abaya" />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700">URL Slug</label>
          <input type="text" name="slug" required className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black" placeholder="e.g. black-premium-abaya" />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700">Price (৳)</label>
            <input type="number" name="price" step="0.01" required className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black" placeholder="e.g. 2500" />
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700">Category</label>
            <select name="categoryId" required className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black bg-white">
              <option value="">Select a category...</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700">Description</label>
          <textarea name="description" rows={3} className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black" placeholder="Product details..."></textarea>
        </div>

        <button type="submit" className="w-full bg-[#222] text-white py-3 px-4 rounded-md hover:bg-black font-bold transition-colors">
          Create Product
        </button>

        {message && (
          <p className={`mt-2 text-sm font-bold ${isSuccess ? "text-green-600" : "text-red-600"}`}>
            {isSuccess ? "✅ " : "❌ "}{message}
          </p>
        )}
      </form>
    </div>
  );
}