"use client";

import { useState } from "react";
import { createOrderAction } from "../actions/order.actions";

export default function ProductCard({ product }: { product: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleOrder(formData: FormData) {
    setIsLoading(true);
    
    // প্রোডাক্টের আইডি এবং দাম ফর্মের ডাটার সাথে যুক্ত করে দিচ্ছি
    formData.append("productId", product.id);
    formData.append("productPrice", product.price.toString());

    const result = await createOrderAction(formData);
    setMessage(result.message);
    setIsSuccess(result.success);
    setIsLoading(false);

    // অর্ডার সফল হলে ২ সেকেন্ড পর পপ-আপ নিজে থেকে বন্ধ হয়ে যাবে
    if (result.success) {
      setTimeout(() => {
        setIsModalOpen(false);
        setMessage("");
      }, 2000);
    }
  }

  return (
    <>
      {/* প্রোডাক্ট কার্ড */}
      <div className="bg-[#111] rounded-xl overflow-hidden border border-gray-800 flex flex-col hover:border-[#FF3366]/50 hover:-translate-y-1 transition-all duration-300">
        <div className="h-56 bg-black flex items-center justify-center border-b border-gray-800 overflow-hidden relative">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          ) : (
            <span className="text-[#FF3366]/40 font-medium text-sm tracking-widest uppercase">Image Coming Soon</span>
          )}
        </div>
        
        <div className="p-5 flex flex-col flex-grow justify-between">
          <div>
            <p className="text-xs text-[#FF3366] font-extrabold mb-2 uppercase tracking-wider">{product.category?.name}</p>
            <h4 className="text-lg font-bold text-gray-100 leading-tight mb-3">{product.name}</h4>
          </div>
          
          <div className="flex justify-between items-end mt-4">
            <span className="text-2xl font-black text-white">৳{product.price}</span>
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="bg-[#FF3366] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-pink-600 transition-all shadow-[0_0_10px_rgba(255,51,102,0.3)]"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* অর্ডার পপ-আপ (Modal) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white text-black rounded-xl p-6 w-full max-w-md relative shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-4 text-gray-500 hover:text-black font-black text-2xl">&times;</button>
            
            <h2 className="text-xl font-extrabold mb-4 border-b pb-3">অর্ডার কনফার্ম করুন</h2>
            
            <form action={handleOrder} className="space-y-3">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">আপনার নাম</label>
                <input type="text" name="customerName" required className="w-full border border-gray-300 rounded-md p-2 bg-gray-50" placeholder="যেমন: রাকিব হাসান" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">মোবাইল নম্বর</label>
                <input type="tel" name="phone" required className="w-full border border-gray-300 rounded-md p-2 bg-gray-50" placeholder="017XXXXXXXX" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">সম্পূর্ণ ঠিকানা</label>
                <textarea name="address" required rows={2} className="w-full border border-gray-300 rounded-md p-2 bg-gray-50" placeholder="বাসা নং, রাস্তা, এলাকা..."></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">ডেলিভারি এরিয়া</label>
                <select name="deliveryArea" required className="w-full border border-gray-300 rounded-md p-2 bg-gray-50">
                  <option value="Inside Dhaka">ঢাকার ভেতরে (ডেলিভারি: ৮০ ৳)</option>
                  <option value="Outside Dhaka">ঢাকার বাইরে (ডেলিভারি: ১৩০ ৳)</option>
                </select>
              </div>

              <button type="submit" disabled={isLoading} className="w-full bg-[#FF3366] text-white py-3 mt-2 rounded-md font-bold hover:bg-[#e62e5c] transition-colors disabled:opacity-50">
                {isLoading ? "অর্ডার প্লেস হচ্ছে..." : "কনফার্ম অর্ডার"}
              </button>

              {message && (
                <p className={`mt-2 text-sm font-bold text-center ${isSuccess ? "text-green-600" : "text-red-600"}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}