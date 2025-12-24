"use client";

import Header from "@/components/home-page/header";
import { allProducts, categories } from "@/shared/placeholders";
import Link from "next/link";
import { useState, useMemo } from "react";

const ProductCard = ({ product }: { product: typeof allProducts[0] }) => {
    const discount = Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
    );

    return (
        <Link
            href={`/products/${product.id}`}
            className="group relative bg-background border border-gray-200/50 dark:border-gray-800/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10 transition-all duration-300 hover:-translate-y-2"
        >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 z-0"></div>

            {/* Image container */}
            <div className="relative aspect-square bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                    🛍️
                </div>

                {/* Discount badge */}
                {discount > 0 && (
                    <div className="absolute top-3 right-3 bg-linear-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        -{discount}%
                    </div>
                )}

                {/* Quick view overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-foreground transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        Quick View
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-5">
                <h3 className="font-bold text-lg mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <span
                                key={i}
                                className={`text-sm ${
                                    i < Math.floor(product.rating)
                                        ? "text-yellow-400"
                                        : "text-gray-300 dark:text-gray-600"
                                }`}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                        ({product.rating})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">
                        ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 dark:text-gray-500 line-through">
                            ${product.originalPrice.toFixed(2)}
                        </span>
                    )}
                </div>

                {/* Add to cart button (appears on hover) */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        // Handle add to cart
                    }}
                    className="w-full mt-4 py-2.5 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
                >
                    Add to Cart
                </button>
        </div>
        </Link>
    );
};

const ProductsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
    const [sortBy, setSortBy] = useState<string>("default");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const productsPerPage = 12;

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = allProducts;

        // Filter by category
        if (selectedCategory) {
            filtered = filtered.filter((p) => p.category === selectedCategory);
        }

        // Filter by price range
        filtered = filtered.filter(
            (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
        );

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter((p) =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort products
        const sorted = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case "price-low":
                    return a.price - b.price;
                case "price-high":
                    return b.price - a.price;
                case "rating":
                    return b.rating - a.rating;
                case "name":
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });

        return sorted;
    }, [selectedCategory, priceRange, sortBy, searchQuery]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = filteredAndSortedProducts.slice(
        startIndex,
        startIndex + productsPerPage
    );

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
                    </div>

                    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl">
                            {/* Breadcrumb */}
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

                {/* Products Section */}
                <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Filters Sidebar */}
                            <aside
                                className={`lg:w-64 shrink-0 ${
                                    isFilterOpen ? "block" : "hidden lg:block"
                                }`}
                            >
                                <div className="bg-background border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sticky top-24">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-foreground">Filters</h2>
                                        <button
                                            onClick={() => setIsFilterOpen(false)}
                                            className="lg:hidden text-gray-500 hover:text-foreground"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    {/* Search */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-foreground mb-2">
                                            Search
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Search products..."
                                            value={searchQuery}
                                            onChange={(e) => {
                                                setSearchQuery(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                                        />
                                    </div>

                                    {/* Category Filter */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-foreground mb-3">
                                            Category
                                        </label>
                                        <div className="space-y-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedCategory(null);
                                                    setCurrentPage(1);
                                                }}
                                                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                                                    selectedCategory === null
                                                        ? "bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white"
                                                        : "bg-gray-100 dark:bg-gray-800 text-foreground hover:bg-gray-200 dark:hover:bg-gray-700"
                                                }`}
                                            >
                                                All Categories
                                            </button>
                                            {categories.map((category) => (
                                                <button
                                                    key={category.id}
                                                    onClick={() => {
                                                        setSelectedCategory(category.name);
                                                        setCurrentPage(1);
                                                    }}
                                                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                                                        selectedCategory === category.name
                                                            ? "bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white"
                                                            : "bg-gray-100 dark:bg-gray-800 text-foreground hover:bg-gray-200 dark:hover:bg-gray-700"
                                                    }`}
                                                >
                                                    {category.icon} {category.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price Range */}
                                    <div className="mb-6">
                                        <label htmlFor="price-range" className="block text-sm font-semibold text-foreground mb-3">
                                            Price Range: ${priceRange[0]} - ${priceRange[1]}
                                        </label>
                                        <input
                                            id="price-range"
                                            type="range"
                                            min="0"
                                            max="500"
                                            value={priceRange[1]}
                                            onChange={(e) => {
                                                setPriceRange([priceRange[0], Number(e.target.value)]);
                                                setCurrentPage(1);
                                            }}
                                            aria-label="Price range filter"
                                            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                        />
                                    </div>

                                    {/* Clear Filters */}
                                    {(selectedCategory || priceRange[1] < 500 || searchQuery) && (
                                        <button
                                            onClick={() => {
                                                setSelectedCategory(null);
                                                setPriceRange([0, 500]);
                                                setSearchQuery("");
                                                setCurrentPage(1);
                                            }}
                                            className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-800 text-foreground rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
                                        >
                                            Clear Filters
                                        </button>
                                    )}
                                </div>
                            </aside>

                            {/* Products Grid */}
                            <div className="flex-1">
                                {/* Toolbar */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setIsFilterOpen(true)}
                                            className="lg:hidden px-4 py-2 bg-background border border-gray-300 dark:border-gray-700 rounded-lg font-semibold text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                                        >
                                            Filters
                                        </button>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Showing {paginatedProducts.length} of{" "}
                                            {filteredAndSortedProducts.length} products
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <label htmlFor="sort-by" className="text-sm font-semibold text-foreground">
                                            Sort by:
                                        </label>
                                        <select
                                            id="sort-by"
                                            value={sortBy}
                                            onChange={(e) => {
                                                setSortBy(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            aria-label="Sort products"
                                            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                                        >
                                            <option value="default">Default</option>
                                            <option value="price-low">Price: Low to High</option>
                                            <option value="price-high">Price: High to Low</option>
                                            <option value="rating">Highest Rated</option>
                                            <option value="name">Name: A to Z</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Products Grid */}
                                {paginatedProducts.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                            {paginatedProducts.map((product) => (
                                                <ProductCard key={product.id} product={product} />
                                            ))}
                                        </div>

                                        {/* Pagination */}
                                        {totalPages > 1 && (
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                                    disabled={currentPage === 1}
                                                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg font-semibold text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                                                >
                                                    Previous
                                                </button>

                                                {[...Array(totalPages)].map((_, i) => {
                                                    const page = i + 1;
                                                    if (
                                                        page === 1 ||
                                                        page === totalPages ||
                                                        (page >= currentPage - 1 && page <= currentPage + 1)
                                                    ) {
                                                        return (
                                                            <button
                                                                key={page}
                                                                onClick={() => setCurrentPage(page)}
                                                                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                                                                    currentPage === page
                                                                        ? "bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white"
                                                                        : "border border-gray-300 dark:border-gray-700 text-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
                                                                }`}
                                                            >
                                                                {page}
                                                            </button>
                                                        );
                                                    } else if (
                                                        page === currentPage - 2 ||
                                                        page === currentPage + 2
                                                    ) {
                                                        return (
                                                            <span key={page} className="px-2 text-gray-500">
                                                                ...
                                                            </span>
                                                        );
                                                    }
                                                    return null;
                                                })}

                                                <button
                                                    onClick={() =>
                                                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                                                    }
                                                    disabled={currentPage === totalPages}
                                                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg font-semibold text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="text-center py-16">
                                        <div className="text-6xl mb-4">🔍</div>
                                        <h3 className="text-2xl font-bold text-foreground mb-2">
                                            No products found
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                                            Try adjusting your filters or search query
                                        </p>
                                        <button
                                            onClick={() => {
                                                setSelectedCategory(null);
                                                setPriceRange([0, 500]);
                                                setSearchQuery("");
                                                setCurrentPage(1);
                                            }}
                                            className="px-6 py-3 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                                        >
                                            Clear All Filters
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ProductsPage;
