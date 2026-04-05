"use client";

import { PublicProductOutput } from "@/types/products";
import { buildDiscount } from "@/utils/build-discount";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: PublicProductOutput }) => {
    const discountedPrice = buildDiscount(product);

    const hasDiscount = !!product.discount && product.discount > 0;

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
                    {
                        product.imgs.length > 0 ? (
                                <Image 
                                    alt={product.imgs[0].alt} src={product.imgs[0].url} 
                                    width={100} height={100}
                                    className="w-full h-full" 
                                />
                        ) : (
                                <div>🛍️</div>
                        )
                    }
                </div>

                {/* Discount badge */}
                {hasDiscount && (
                    <div className="absolute top-3 right-3 bg-linear-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        -{product.discount}%
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

                {/* Price Section */}
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-2xl font-bold text-foreground">
                        ${discountedPrice.toFixed(2)}
                    </span>

                    {hasDiscount && (
                        <span className="text-sm text-gray-500 dark:text-gray-500 line-through">
                            ${product.price.toFixed(2)}
                        </span>
                    )}
                </div>

                {/* Optional: You can add savings amount */}
                {hasDiscount && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                        You save ${(product.price - discountedPrice).toFixed(2)}
                    </p>
                )}

                {/* Add to cart button (appears on hover) */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        // TODO: Add to cart logic (we'll handle this later with cart persistence)
                        console.log("Add to cart clicked for product", product.id);
                    }}
                    className="w-full mt-4 py-2.5 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
                >
                    Add to Cart
                </button>
            </div>
        </Link>
    );
};

export default ProductCard;