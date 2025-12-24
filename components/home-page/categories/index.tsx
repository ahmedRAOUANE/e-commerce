import { categories } from '@/shared/placeholders'
import CategoryCard from './category-card'

const Categories = () => {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                    Shop by Category
                </h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((category: typeof categories[0]) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Categories