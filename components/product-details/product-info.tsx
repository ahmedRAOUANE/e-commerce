"use client";

import { useState } from "react";
import QuantitySelector from "./quantity-selector";
import { PublicProductOutput } from "@/types/products";
import { buildDiscount } from "@/utils/build-discount";

interface ProductInfoProps {
    product: PublicProductOutput;
}

export default function ProductInfo({ product }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1);
    const discountedPrice = buildDiscount(product);

    return (
        <div className="space-y-4 sm:space-y-6">
            <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
                    {product.name}
                </h1>
                {/* <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <span
                                    key={i}
                                    className={`text-sm sm:text-base md:text-lg ${i < Math.floor(product.rating)
                                            ? "text-yellow-400"
                                            : "text-gray-300 dark:text-gray-600"
                                        }`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                            ({product.rating})
                        </span>
                    </div>
                </div> */}
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                    ${discountedPrice.toFixed(2)}
                </span>
                {product.price > discountedPrice && (
                    <>
                        <span className="text-lg sm:text-xl text-gray-500 line-through">
                            ${product.price.toFixed(2)}
                        </span>
                        <span className="px-2 py-1 sm:px-3 sm:py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                            Save ${(product.price - discountedPrice).toFixed(2)}
                        </span>
                    </>
                )}
            </div>

            {/* Description */}
            <div>
                <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">
                    Description
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    {product.description}
                </p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-3 sm:space-y-4 pt-4">
                <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button className="flex-1 px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg font-semibold text-base sm:text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                        Add to Cart
                    </button>
                    <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 rounded-lg font-semibold text-base sm:text-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all">
                        Buy Now
                    </button>
                </div>
            </div>

            {/* Features */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        <span className="text-green-500 shrink-0">✓</span>
                        <span>Free shipping on orders over $50</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        <span className="text-green-500 shrink-0">✓</span>
                        <span>30-day return policy</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        <span className="text-green-500 shrink-0">✓</span>
                        <span>1-year warranty included</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}