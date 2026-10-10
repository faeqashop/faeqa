import { getProducts } from "../lib/dal/product.dal";
import Link from "next/link";
import ProductCard from "../components/ProductCard"; // নতুন কার্ড ইমপোর্ট করা হলো

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="bg-black border-b border-[#FF3366]/20 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl font-extrabold text-white tracking-wide">
          BD <span className="text-[#FF3366]">E-Commerce</span>
        </h1>
        <Link href="/admin" className="text-sm font-bold text-[#FF3366] hover:text-pink-400 transition-colors">
          Admin Panel &rarr;
        </Link>
      </nav>

      <div className="bg-[#0a0a0a] text-white py-20 md:py-28 text-center px-4 border-b border-[#FF3366]/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF3366] opacity-10 blur-[100px] rounded-full pointer-events-none"></div>
        <h2 className="text-4xl md:text-6xl font-black mb-4 relative z-10">
          Welcome to Our <span className="text-[#FF3366]">Store</span>
        </h2>
        <p className="text-lg md:text-xl font-medium text-gray-400 relative z-10">
          Premium quality products at the best prices.
        </p>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-6">
        <div className="flex items-center gap-3 mb-10 justify-center md:justify-start">
          <div className="w-2 h-8 bg-[#FF3366] rounded-full"></div>
          <h3 className="text-3xl font-bold text-white">Latest Arrivals</h3>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-[#111] rounded-lg border border-gray-800">
            <p className="text-gray-500 text-lg">No products available right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} /> // নতুন কার্ড এখানে ব্যবহার হলো
            ))}
          </div>
        )}
      </div>
    </main>
  );
}