"use client";

interface QuantitySelectorProps {
    quantity: number;
    onQuantityChange: (quantity: number) => void;
}

export default function QuantitySelector({ quantity, onQuantityChange }: QuantitySelectorProps) {
    const increment = () => onQuantityChange(quantity + 1);
    const decrement = () => onQuantityChange(Math.max(1, quantity - 1));

    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label htmlFor="quantity" className="text-sm font-semibold text-foreground">
                Quantity:
            </label>
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={decrement}
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
                    onChange={(e) => onQuantityChange(Math.max(1, Number(e.target.value)))}
                    className="w-16 h-10 text-center border border-gray-300 dark:border-gray-700 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <button
                    type="button"
                    onClick={increment}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-lg font-semibold text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    aria-label="Increase quantity"
                >
                    +
                </button>
            </div>
        </div>
    );
}