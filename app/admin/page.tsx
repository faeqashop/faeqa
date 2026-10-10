import prisma from "../../lib/prisma";
import Link from "next/link";
import CategoryForm from "../../components/admin/CategoryForm";
import ProductForm from "../../components/admin/ProductForm";
import LogoutButton from "../../components/admin/LogoutButton";

export const instant = false;

export default async function AdminDashboard() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });

  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* ড্যাশবোর্ড হেডার ও বাটনগুলো */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h1 className="text-3xl md:text-4xl font-black text-black">
            Admin <span className="text-[#FF3366]">Dashboard</span>
          </h1>
          
          {/* ডানপাশের বাটনগুলো */}
          <div className="flex gap-3">
            <Link 
              href="/admin/orders" 
              className="bg-[#FF3366] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#e62e5c] transition-colors shadow-[0_0_15px_rgba(255,51,102,0.2)] flex items-center gap-2 text-lg"
            >
              📦 View All Orders
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* মেইন গ্রিড সেকশন (বাম পাশে ফর্ম, ডান পাশে লিস্ট) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* বাম কলাম: ফর্মগুলো */}
          <div className="space-y-8">
            <CategoryForm />
            <ProductForm categories={categories} />
          </div>

          {/* ডান কলাম: ডাটা লিস্ট */}
          <div className="space-y-8">
            
            {/* ক্যাটাগরি লিস্ট */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-black mb-6">Current Categories</h2>
              <div className="space-y-3">
                {categories.length === 0 ? (
                  <p className="text-gray-500">No categories added yet.</p>
                ) : (
                  categories.map((cat) => (
                    <div key={cat.id} className="flex justify-between items-center border-l-4 border-[#FF3366] bg-gray-50 p-4 rounded-r-md">
                      <span className="font-bold text-black">{cat.name}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* প্রোডাক্ট লিস্ট */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-black mb-6">Current Products</h2>
              <div className="space-y-3">
                {products.length === 0 ? (
                  <p className="text-gray-500">No products added yet.</p>
                ) : (
                  products.map((prod) => (
                    <div key={prod.id} className="flex justify-between items-center border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-md">
                      <div>
                        <span className="font-bold text-black block text-lg">{prod.name}</span>
                        <span className="text-sm text-gray-500 font-medium">Category: {prod.category?.name}</span>
                      </div>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-bold text-sm">
                        ৳{prod.price}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}