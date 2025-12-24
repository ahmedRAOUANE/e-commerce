import { categories } from '@/shared/placeholders';
import Link from 'next/link';
import React from 'react'

const CategoryCard = ({
    category,
}: {
    category: typeof categories[0];
}) => {
    return (
        <Link
            href={`/categories/${category.id}`}
            className="group bg-background border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 text-center"
        >
            <div className="text-5xl mb-3">{category.icon}</div>
            <h3 className="font-semibold text-lg mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {category.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
                {category.count} products
            </p>
        </Link>
    );
};

export default CategoryCard