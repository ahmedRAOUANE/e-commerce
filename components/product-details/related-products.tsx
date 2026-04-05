import ProductCard from "@/components/product-card";
import { PublicProductOutput } from "@/types/products";

interface RelatedProductsProps {
    products: PublicProductOutput[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
    return (
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
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}