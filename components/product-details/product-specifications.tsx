interface ProductSpecificationsProps {
    specifications: Record<string, string | number>;
}

export default function ProductSpecifications({ specifications }: ProductSpecificationsProps) {
    if (!specifications || Object.keys(specifications).length === 0) {
        return null;
    }

    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
                Specifications
            </h2>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <dl className="space-y-3 sm:space-y-4">
                    {Object.entries(specifications).map(([key, value]) => (
                        <div
                            key={key}
                            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 py-2 border-b border-gray-200 dark:border-gray-800 last:border-0"
                        >
                            <dt className="font-semibold text-sm sm:text-base text-foreground">
                                {key}:
                            </dt>
                            <dd className="text-sm sm:text-base text-gray-600 dark:text-gray-400 sm:text-right">
                                {value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
}