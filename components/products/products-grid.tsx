"use client";

import ProductCard from "@/components/product-card";
import { PublicProductOutput } from "@/types/products";

interface ProductsGridProps {
    products: PublicProductOutput[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onClearFilters: () => void;
}

export default function ProductsGrid({
    products,
    currentPage,
    totalPages,
    onPageChange,
    onClearFilters,
}: ProductsGridProps) {
    if (products.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                    No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Try adjusting your filters or search query
                </p>
                <button
                    onClick={onClearFilters}
                    className="px-6 py-3 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                    Clear All Filters
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <button
                        type="button"
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg font-semibold text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                            return (
                                <button
                                    key={page}
                                    onClick={() => onPageChange(page)}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${currentPage === page
                                            ? "bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white"
                                            : "border border-gray-300 dark:border-gray-700 text-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                            return (
                                <span key={page} className="px-2 text-gray-500">
                                    ...
                                </span>
                            );
                        }
                        return null;
                    })}

                    <button
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg font-semibold text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    );
}