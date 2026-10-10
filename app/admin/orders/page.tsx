import prisma from "../../../lib/prisma";
import Link from "next/link";
import OrderStatus from "../../../components/admin/OrderStatus";

export const instant = false;

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { product: true },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-black">
            Customer <span className="text-[#FF3366]">Orders</span>
          </h1>
          <Link href="/admin" className="bg-black text-white px-5 py-2 rounded-md font-bold hover:bg-gray-800 transition-colors">
            &larr; Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-4 border-b">Customer Info</th>
                  <th className="p-4 border-b">Product</th>
                  <th className="p-4 border-b">Address & Area</th>
                  <th className="p-4 border-b">Total Price</th>
                  <th className="p-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-gray-500 font-bold">No orders found.</td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50 text-black">
                      <td className="p-4">
                        <p className="font-bold">{order.customerName}</p>
                        <p className="text-sm text-gray-600">{order.phone}</p>
                      </td>
                      <td className="p-4 font-bold text-[#FF3366]">
                        {order.product?.name}
                      </td>
                      <td className="p-4">
                        <p className="text-sm">{order.address}</p>
                        <p className="text-xs font-bold text-gray-500 mt-1">
                          {order.deliveryArea} (ডেলিভারি: ৳{order.deliveryFee})
                        </p>
                      </td>
                      <td className="p-4 font-black">৳{order.totalPrice}</td>
                      <td className="p-4">
                        {/* এখানে নতুন ড্রপডাউনটি বসানো হয়েছে */}
                        <OrderStatus orderId={order.id} currentStatus={order.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}