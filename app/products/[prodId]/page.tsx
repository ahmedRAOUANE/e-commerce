import Header from "@/components/home-page/header";
import ProductImageGallery from "@/components/product-details/product-image-gallery";
import ProductInfo from "@/components/product-details/product-info";
import RelatedProducts from "@/components/product-details/related-products";
import { fetchPublicProductsService, fetchSinglePublicProductService } from "@/services/products/fetch";
import Link from "next/link";

interface PageProps {
    params: Promise<{ prodId: string }>;
}

export default async function ProductDetailsPage({ params }: PageProps) {
    const {prodId} = await params 
    const productId = Number(prodId);
    const product = await fetchSinglePublicProductService(productId);
    // const reviews = getProductReviews(productId);
    const allProducts = await fetchPublicProductsService();

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center py-12 sm:py-20 px-4">
                    <div className="text-center max-w-md">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                            Product Not Found
                        </h1>
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

    const discountedPrice = product.discount
        ? Math.round(product.price * (1 - product.discount / 100) * 100) / 100 // round to 2 decimals
        : product.price;

    // Related products (same category, excluding current product)
    const relatedProducts = allProducts
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Breadcrumb - static, stays server */}
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

                {/* Product Details Section */}
                <section className="py-8 sm:py-12 md:py-16 bg-background">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
                            {/* Product Images - Client Component */}
                            <ProductImageGallery images={product.imgs} discount={discountedPrice} />

                            {/* Product Info - Client Component */}
                            <ProductInfo product={product} />
                        </div>

                        {/* Specifications & Reviews Tabs - Server Components */}
                        {/* <div className="border-t border-gray-200 dark:border-gray-800 pt-6 sm:pt-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                <ProductSpecifications specifications={product.specifications} />
                                <ProductReviews reviews={reviews} />
                            </div>
                        </div> */}
                    </div>
                </section>

                {/* Related Products - Server Component (renders client ProductCard inside) */}
                {relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} />}
            </main>
        </div>
    );
}