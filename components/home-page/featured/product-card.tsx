"use client"

import { featuredProducts } from "@/shared/placeholders";
import Link from "next/link";

const ProductCard = ({ product }: { product: typeof featuredProducts[0] }) => {
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
                                className={`text-sm ${i < Math.floor(product.rating)
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

export default ProductCard