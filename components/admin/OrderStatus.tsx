"use client";

import { updateOrderStatusAction } from "../../actions/order.actions";

export default function OrderStatus({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  
  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    await updateOrderStatusAction(orderId, newStatus);
  }

  // স্ট্যাটাস অনুযায়ী রং ঠিক করা
  const color = 
    currentStatus === "PENDING" ? "bg-yellow-100 text-yellow-800" :
    currentStatus === "CONFIRMED" ? "bg-blue-100 text-blue-800" :
    currentStatus === "DELIVERED" ? "bg-green-100 text-green-800" :
    "bg-red-100 text-red-800";

  return (
    <select
      defaultValue={currentStatus}
      onChange={handleChange}
      className={`border border-gray-200 rounded-md p-2 text-sm font-bold cursor-pointer outline-none ${color}`}
    >
      <option value="PENDING" className="bg-white text-black">Pending</option>
      <option value="CONFIRMED" className="bg-white text-black">Confirmed</option>
      <option value="DELIVERED" className="bg-white text-black">Delivered</option>
      <option value="CANCELLED" className="bg-white text-black">Cancelled</option>
    </select>
  );
}