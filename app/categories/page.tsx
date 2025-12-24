"use client";

import Header from "@/components/home-page/header";
import { categories } from "@/shared/placeholders";
import Link from "next/link";

const CategoryCard = ({
    category,
}: {
    category: typeof categories[0];
}) => {
    return (
        <Link
            href={`/categories/${category.id}`}
            className="group relative bg-background border border-gray-200/50 dark:border-gray-800/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10 transition-all duration-300 hover:-translate-y-2"
        >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300 z-0"></div>

            {/* Content */}
            <div className="relative z-10 p-6 sm:p-8 text-center">
                {/* Icon */}
                <div className="mb-4 sm:mb-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                    </div>
                </div>

                {/* Category Name */}
                <h3 className="font-bold text-xl sm:text-2xl mb-2 sm:mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {category.name}
                </h3>

                {/* Product Count */}
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
                    {category.count} products
                </p>

                {/* View Products Button (appears on hover) */}
                <div className="mt-4 sm:mt-6 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg text-sm font-semibold">
                        View Products
                        <svg
                            className="w-4 h-4"
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
                    </span>
                </div>
            </div>
        </Link>
    );
};

const CategoriesPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Page Header */}
                <section className="relative py-12 md:py-16 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
                    </div>

                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>

                    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                Browse All Categories
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                                Shop by
                                <span className="block bg-linear-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                                    Category
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
                                Explore our wide range of categories and discover products that match your style and needs
                            </p>
                        </div>
                    </div>
                </section>

                {/* Categories Grid */}
                <section className="relative py-12 md:py-16 bg-gray-50 dark:bg-gray-900 overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Section Header */}
                        <div className="text-center mb-8 sm:mb-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-3">
                                <span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></span>
                                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                                    All Categories
                                </span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2 sm:mb-3">
                                Explore Our Categories
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                Find exactly what you&apos;re looking for by browsing through our carefully curated categories
                            </p>
                        </div>

                        {/* Categories Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                            {categories.map((category) => (
                                <CategoryCard key={category.id} category={category} />
                            ))}
                        </div>

                        {/* Stats Section */}
                        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                            <div className="bg-background border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-6 text-center">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">
                                    {categories.length}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                    Categories
                                </div>
                            </div>
                            <div className="bg-background border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-6 text-center">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">
                                    {categories.reduce((sum, cat) => sum + cat.count, 0)}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                    Total Products
                                </div>
                            </div>
                            <div className="bg-background border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-6 text-center">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">
                                    24/7
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                    Support
                                </div>
                            </div>
                            <div className="bg-background border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-6 text-center">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">
                                    4.9★
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                    Rating
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative py-12 md:py-16 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    </div>
                    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                            Can&apos;t Find What You&apos;re Looking For?
                        </h2>
                        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
                            Browse all our products or contact our support team for assistance
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/products"
                                className="group relative px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
                            >
                                <span className="relative z-10">View All Products</span>
                                <div className="absolute inset-0 bg-linear-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </Link>
                            <Link
                                href="/contact"
                                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
                            >
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default CategoriesPage;
