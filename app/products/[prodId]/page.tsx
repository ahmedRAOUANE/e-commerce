"use client";

import Header from "@/components/home-page/header";
import { allProducts, getProductDetails, getProductReviews } from "@/shared/placeholders";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const ProductCard = ({ product }: { product: typeof allProducts[0] }) => {
    const discount = Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
    );

    return (
        <Link
            href={`/products/${product.id}`}
            className="group relative bg-background border border-gray-200/50 dark:border-gray-800/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10 transition-all duration-300 hover:-translate-y-2"
        >
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 z-0"></div>

            <div className="relative aspect-square bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                    🛍️
                </div>
                {discount > 0 && (
                    <div className="absolute top-3 right-3 bg-linear-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        -{discount}%
                    </div>
                )}
            </div>

            <div className="relative z-10 p-5">
                <h3 className="font-bold text-lg mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                    {product.name}
                </h3>
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
            </div>
        </Link>
    );
};

const ProductDetailsPage = () => {
    const params = useParams();
    const productId = Number(params.prodId);
    const product = getProductDetails(productId);
    const reviews = getProductReviews(productId);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    if (!product) {
    return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center py-12 sm:py-20 px-4">
                    <div className="text-center max-w-md">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">Product Not Found</h1>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
                            The product you&apos;re looking for doesn&apos;t exist.
                        </p>
                        <Link
                            href="/products"
                            className="inline-block px-6 py-3 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                        >
                            Browse Products
                        </Link>
                    </div>
                </main>
        </div>
        );
    }

    const discount = Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
    );

    // Get related products (same category, excluding current product)
    const relatedProducts = allProducts
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    // Product images (mock - in real app, these would come from product data)
    const productImages = [
        product.image,
        product.image,
        product.image,
        product.image,
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Breadcrumb */}
                <section className="py-4 sm:py-6 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 overflow-x-auto">
                            <Link href="/" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors whitespace-nowrap">
                                Home
                            </Link>
                            <span>/</span>
                            <Link href="/products" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors whitespace-nowrap">
                                Products
                            </Link>
                            <span>/</span>
                            <span className="text-foreground truncate max-w-[200px] sm:max-w-none">{product.name}</span>
                        </nav>
                    </div>
                </section>

                {/* Product Details */}
                <section className="py-8 sm:py-12 md:py-16 bg-background">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
                            {/* Product Images */}
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
                                    {productImages.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                                selectedImage === index
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

                            {/* Product Info */}
                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
                                        {product.name}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <span
                                                        key={i}
                                                        className={`text-sm sm:text-base md:text-lg ${
                                                            i < Math.floor(product.rating)
                                                                ? "text-yellow-400"
                                                                : "text-gray-300 dark:text-gray-600"
                                                        }`}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium whitespace-nowrap">
                                                ({product.rating}) • {reviews.length} reviews
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    {product.originalPrice > product.price && (
                                        <>
                                            <span className="text-lg sm:text-xl text-gray-500 line-through">
                                                ${product.originalPrice.toFixed(2)}
                                            </span>
                                            <span className="px-2 py-1 sm:px-3 sm:py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                                                Save ${(product.originalPrice - product.price).toFixed(2)}
                                            </span>
                                        </>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">Description</h2>
                                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Quantity & Add to Cart */}
                                <div className="space-y-3 sm:space-y-4 pt-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                        <label htmlFor="quantity" className="text-sm font-semibold text-foreground">
                                            Quantity:
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                                className="w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-lg font-semibold text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                                                aria-label="Decrease quantity"
                                            >
                                                −
                                            </button>
                                            <input
                                                id="quantity"
                                                type="number"
                                                min="1"
                                                value={quantity}
                                                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                                                className="w-16 h-10 text-center border border-gray-300 dark:border-gray-700 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setQuantity((q) => q + 1)}
                                                className="w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-lg font-semibold text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                        <button
                                            type="button"
                                            className="flex-1 px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg font-semibold text-base sm:text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            type="button"
                                            className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 rounded-lg font-semibold text-base sm:text-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
                                        >
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
                        </div>

                        {/* Specifications & Reviews Tabs */}
                        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 sm:pt-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                {/* Specifications */}
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Specifications</h2>
                                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                                        <dl className="space-y-3 sm:space-y-4">
                                            {Object.entries(product.specifications || {}).map(([key, value]) => (
                                                <div key={key} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 py-2 border-b border-gray-200 dark:border-gray-800 last:border-0">
                                                    <dt className="font-semibold text-sm sm:text-base text-foreground">{key}:</dt>
                                                    <dd className="text-sm sm:text-base text-gray-600 dark:text-gray-400 sm:text-right">{value}</dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </div>
                                </div>

                                {/* Reviews */}
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Customer Reviews</h2>
                                    <div className="space-y-4 sm:space-y-6">
                                        {reviews.map((review) => (
                                            <div key={review.id} className="bg-gray-50 dark:bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                                                <div className="flex items-start justify-between mb-2 sm:mb-3">
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1">
                                                            {review.name}
                                                        </h3>
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <div className="flex items-center">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <span
                                                                        key={i}
                                                                        className={`text-xs sm:text-sm ${
                                                                            i < review.rating
                                                                                ? "text-yellow-400"
                                                                                : "text-gray-300 dark:text-gray-600"
                                                                        }`}
                                                                    >
                                                                        ★
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            <span className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">
                                                                {review.date}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 wrap-break-word">{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="mb-6 sm:mb-8">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                                    Related Products
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                                    You might also like these products
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                {relatedProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default ProductDetailsPage;
