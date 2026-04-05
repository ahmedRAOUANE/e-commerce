"use client";

import { PublicProductOutput } from "@/types/products";
import { useState, useMemo } from "react";
import FilterSidebar from "./filters-sidebat";
import ProductsToolbar from "./products-toolbat";
import ProductsGrid from "./products-grid";

interface ProductsClientProps {
    products: PublicProductOutput[];
    categories: PublicProductOutput['category'][];
}

export default function ProductsClient({ products, categories }: ProductsClientProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
    const [sortBy, setSortBy] = useState<string>("default");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const productsPerPage = 12;

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products;

        if (selectedCategory) {
            filtered = filtered.filter((p) => p.category.name === selectedCategory);
        }

        filtered = filtered.filter(
            (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
        );

        if (searchQuery) {
            filtered = filtered.filter((p) =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        const sorted = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case "price-low":
                    return a.price - b.price;
                case "price-high":
                    return b.price - a.price;
                // case "rating":
                //     return b.rating - a.rating;
                case "name":
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });

        return sorted;
    }, [selectedCategory, priceRange, sortBy, searchQuery, products]);

    const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = filteredAndSortedProducts.slice(
        startIndex,
        startIndex + productsPerPage
    );

    // Helper to reset all filters
    const clearAllFilters = () => {
        setSelectedCategory(null);
        setPriceRange([0, 500]);
        setSearchQuery("");
        setCurrentPage(1);
    };

    return (
        <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <FilterSidebar
                        isOpen={isFilterOpen}
                        onClose={() => setIsFilterOpen(false)}
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={(cat) => {
                            setSelectedCategory(cat);
                            setCurrentPage(1);
                        }}
                        priceRange={priceRange}
                        onPriceRangeChange={(newRange) => {
                            setPriceRange(newRange);
                            setCurrentPage(1);
                        }}
                        searchQuery={searchQuery}
                        onSearchChange={(query) => {
                            setSearchQuery(query);
                            setCurrentPage(1);
                        }}
                        onClearFilters={clearAllFilters}
                        hasActiveFilters={!!(selectedCategory || priceRange[1] < 500 || searchQuery)}
                    />

                    {/* Main content */}
                    <div className="flex-1">
                        <ProductsToolbar
                            onOpenFilter={() => setIsFilterOpen(true)}
                            resultCount={paginatedProducts.length}
                            totalCount={filteredAndSortedProducts.length}
                            sortBy={sortBy}
                            onSortChange={(newSort) => {
                                setSortBy(newSort);
                                setCurrentPage(1);
                            }}
                        />

                        <ProductsGrid
                            products={paginatedProducts}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            onClearFilters={clearAllFilters}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}