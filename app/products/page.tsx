import Header from "@/components/home-page/header";
import ProductsClient from "@/components/products/client";
import { fetchPublicProductsService } from "@/services/products/fetch";
import Link from "next/link";

export default async function ProductsPage() {
    const allProducts = await fetchPublicProductsService()
    const categories = allProducts.map(p => p.category)

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                <section className="relative py-12 md:py-16 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    </div>

                    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl">
                            <nav className="flex items-center gap-2 text-sm mb-4 text-white/80">
                                <Link href="/" className="hover:text-white transition-colors">
                                    Home
                                </Link>
                                <span>/</span>
                                <span className="text-white">Products</span>
                            </nav>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                All Products
                            </h1>
                            <p className="text-lg md:text-xl text-white/90">
                                Discover our complete collection of premium products
                            </p>
                        </div>
                    </div>
                </section>

                <ProductsClient products={allProducts} categories={categories} />
            </main>
        </div>
    );
}