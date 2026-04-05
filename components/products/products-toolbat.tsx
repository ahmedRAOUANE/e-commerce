"use client";

interface ProductsToolbarProps {
    onOpenFilter: () => void;
    resultCount: number;
    totalCount: number;
    sortBy: string;
    onSortChange: (value: string) => void;
}

export default function ProductsToolbar({
    onOpenFilter,
    resultCount,
    totalCount,
    sortBy,
    onSortChange,
}: ProductsToolbarProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={onOpenFilter}
                    className="lg:hidden px-4 py-2 bg-background border border-gray-300 dark:border-gray-700 rounded-lg font-semibold text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                    Filters
                </button>
                <p className="text-gray-600 dark:text-gray-400">
                    Showing {resultCount} of {totalCount} products
                </p>
            </div>

            <div className="flex items-center gap-2">
                <label htmlFor="sort-by" className="text-sm font-semibold text-foreground">
                    Sort by:
                </label>
                <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
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
    );
}