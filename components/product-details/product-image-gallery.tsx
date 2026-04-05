"use client";

import { PublicProductOutput } from "@/types/products";
import { useState } from "react";

interface ProductImageGalleryProps {
    images: PublicProductOutput['imgs'];
    discount: number;
}

export default function ProductImageGallery({ images, discount }: ProductImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="space-y-3 sm:space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
                <div className="w-full h-full flex items-center justify-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
                    🛍️
                </div>
                {discount > 0 && (
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-linear-to-r from-red-500 to-pink-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                        -{discount}%
                    </div>
                )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {images.map((image, index) => (
                    <button
                        type="button"
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                ? "border-purple-600 dark:border-purple-400"
                                : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                            }`}
                    >
                        <div className="w-full h-full flex items-center justify-center text-lg sm:text-xl md:text-2xl bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                            🛍️
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}