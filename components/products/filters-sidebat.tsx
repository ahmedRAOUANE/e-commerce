"use client";

import { PublicProductOutput } from "@/types/products";
import { useMemo } from "react";

interface FilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    categories: PublicProductOutput['category'][];
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
    priceRange: [number, number];
    onPriceRangeChange: (range: [number, number]) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onClearFilters: () => void;
    hasActiveFilters: boolean;
}

export default function FilterSidebar({
    isOpen,
    onClose,
    categories,
    selectedCategory,
    onSelectCategory,
    priceRange,
    onPriceRangeChange,
    searchQuery,
    onSearchChange,
    onClearFilters,
    hasActiveFilters,
}: FilterSidebarProps) {
    const [maxPrice] = priceRange;

    const uniqueCategories = useMemo(() => {
        const seen = new Set();
        return categories.filter((category) => {
            if (seen.has(category.name)) return false;
            seen.add(category.name);
            return true;
        });
    }, [categories]);

    return (
        <aside className={`lg:w-64 shrink-0 ${isOpen ? "block" : "hidden lg:block"}`}>
            <div className="bg-background border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-foreground">Filters</h2>
                    <button
                        onClick={onClose}
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
                        onChange={(e) => onSearchChange(e.target.value)}
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
                            type="button"
                            onClick={() => onSelectCategory(null)}
                            className={`w-full text-left px-4 py-2 rounded-lg transition-all ${selectedCategory === null
                                    ? "bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white"
                                    : "bg-gray-100 dark:bg-gray-800 text-foreground hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`}
                        >
                            All Categories
                        </button>
                        {uniqueCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => onSelectCategory(category.name)}
                                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${selectedCategory === category.name
                                        ? "bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white"
                                        : "bg-gray-100 dark:bg-gray-800 text-foreground hover:bg-gray-200 dark:hover:bg-gray-700"
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-foreground mb-3">
                        Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <input
                        title="range"
                        type="range"
                        min="0"
                        max="500"
                        value={maxPrice}
                        onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={onClearFilters}
                        className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-800 text-foreground rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
                    >
                        Clear Filters
                    </button>
                )}
            </div>
        </aside>
    );
}