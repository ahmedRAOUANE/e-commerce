import { featuredProducts } from "@/shared/placeholders"
import Link from "next/link"
import ProductCard from "./product-card"

const Featured = () => {
    return (
        <section className="relative py-20 md:py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 md:mb-16 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-3">
                            <span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></span>
                            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                                Featured Collection
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                            Featured Products
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">
                            Discover our handpicked selection of premium products
                        </p>
                    </div>

                    <Link
                        href="/products"
                        className="group flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full font-semibold text-foreground hover:bg-linear-to-r hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg"
                    >
                        View All
                        <svg
                            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Featured
