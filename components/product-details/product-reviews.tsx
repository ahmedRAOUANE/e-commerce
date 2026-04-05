interface Review {
    id: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
}

interface ProductReviewsProps {
    reviews: Review[];
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
                Customer Reviews
            </h2>
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
                                                className={`text-xs sm:text-sm ${i < review.rating
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
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 wrap-break-word">
                            {review.comment}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}