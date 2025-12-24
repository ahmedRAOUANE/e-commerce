export const featuredProducts = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        originalPrice: 149.99,
        image: "/placeholder-product.jpg",
        rating: 4.5,
        category: "Electronics",
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        originalPrice: 249.99,
        image: "/placeholder-product.jpg",
        rating: 4.8,
        category: "Electronics",
    },
    {
        id: 3,
        name: "Laptop Stand",
        price: 49.99,
        originalPrice: 69.99,
        image: "/placeholder-product.jpg",
        rating: 4.3,
        category: "Electronics",
    },
    {
        id: 4,
        name: "USB-C Hub",
        price: 39.99,
        originalPrice: 59.99,
        image: "/placeholder-product.jpg",
        rating: 4.6,
        category: "Electronics",
    },
];

export const allProducts = [
    ...featuredProducts,
    {
        id: 5,
        name: "Designer T-Shirt",
        price: 29.99,
        originalPrice: 49.99,
        image: "/placeholder-product.jpg",
        rating: 4.2,
        category: "Fashion",
    },
    {
        id: 6,
        name: "Running Shoes",
        price: 79.99,
        originalPrice: 119.99,
        image: "/placeholder-product.jpg",
        rating: 4.7,
        category: "Sports",
    },
    {
        id: 7,
        name: "Coffee Maker",
        price: 89.99,
        originalPrice: 129.99,
        image: "/placeholder-product.jpg",
        rating: 4.4,
        category: "Home & Living",
    },
    {
        id: 8,
        name: "Fiction Novel",
        price: 14.99,
        originalPrice: 24.99,
        image: "/placeholder-product.jpg",
        rating: 4.6,
        category: "Books",
    },
    {
        id: 9,
        name: "Skincare Set",
        price: 59.99,
        originalPrice: 89.99,
        image: "/placeholder-product.jpg",
        rating: 4.5,
        category: "Beauty",
    },
    {
        id: 10,
        name: "Wireless Mouse",
        price: 24.99,
        originalPrice: 39.99,
        image: "/placeholder-product.jpg",
        rating: 4.3,
        category: "Electronics",
    },
    {
        id: 11,
        name: "Yoga Mat",
        price: 34.99,
        originalPrice: 54.99,
        image: "/placeholder-product.jpg",
        rating: 4.4,
        category: "Sports",
    },
    {
        id: 12,
        name: "Throw Pillow Set",
        price: 39.99,
        originalPrice: 59.99,
        image: "/placeholder-product.jpg",
        rating: 4.5,
        category: "Home & Living",
    },
    {
        id: 13,
        name: "Denim Jacket",
        price: 69.99,
        originalPrice: 99.99,
        image: "/placeholder-product.jpg",
        rating: 4.6,
        category: "Fashion",
    },
    {
        id: 14,
        name: "Tablet Stand",
        price: 19.99,
        originalPrice: 34.99,
        image: "/placeholder-product.jpg",
        rating: 4.2,
        category: "Electronics",
    },
    {
        id: 15,
        name: "Lipstick Set",
        price: 24.99,
        originalPrice: 39.99,
        image: "/placeholder-product.jpg",
        rating: 4.7,
        category: "Beauty",
    },
    {
        id: 16,
        name: "Cookbook",
        price: 18.99,
        originalPrice: 28.99,
        image: "/placeholder-product.jpg",
        rating: 4.5,
        category: "Books",
    },
];

export const categories = [
    { id: 1, name: "Electronics", icon: "📱", count: 120 },
    { id: 2, name: "Fashion", icon: "👕", count: 85 },
    { id: 3, name: "Home & Living", icon: "🏠", count: 95 },
    { id: 4, name: "Sports", icon: "⚽", count: 60 },
    { id: 5, name: "Books", icon: "📚", count: 45 },
    { id: 6, name: "Beauty", icon: "💄", count: 70 },
];

// Product details helper
export const getProductDetails = (id: number) => {
    const product = allProducts.find((p) => p.id === id);
    if (!product) return null;

    const descriptions: Record<number, string> = {
        1: "Experience premium sound quality with these wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers and professionals alike.",
        2: "Stay connected and track your fitness with this smartwatch. Features include heart rate monitoring, GPS tracking, sleep analysis, and smartphone notifications. Water-resistant design perfect for active lifestyles.",
        3: "Ergonomic laptop stand that elevates your screen to eye level, reducing neck strain. Adjustable height and angle, sturdy aluminum construction. Perfect for home office or workspace setup.",
        4: "Expand your laptop's connectivity with this USB-C hub. Features multiple ports including HDMI, USB 3.0, SD card reader, and power delivery. Compact design perfect for on-the-go professionals.",
        5: "Premium quality designer t-shirt made from 100% organic cotton. Comfortable fit, durable construction, and stylish design. Available in multiple colors and sizes.",
        6: "High-performance running shoes designed for comfort and durability. Breathable mesh upper, cushioned sole, and excellent traction. Perfect for daily runs and workouts.",
        7: "Professional-grade coffee maker with programmable settings. Brews up to 12 cups, features thermal carafe, and includes reusable filter. Start your day with the perfect cup of coffee.",
        8: "Bestselling fiction novel that will keep you captivated from start to finish. Engaging storyline, well-developed characters, and beautiful prose. A must-read for book lovers.",
        9: "Complete skincare set featuring cleanser, toner, serum, and moisturizer. Formulated with natural ingredients for all skin types. Achieve healthy, glowing skin with this comprehensive routine.",
        10: "Wireless mouse with ergonomic design and long battery life. Precise tracking, comfortable grip, and silent clicks. Perfect for work or gaming.",
        11: "Premium yoga mat with non-slip surface and extra cushioning. Eco-friendly materials, easy to clean, and comes with carrying strap. Enhance your yoga practice.",
        12: "Decorative throw pillow set of 4 pillows. Soft, plush fabric with modern designs. Perfect for adding style and comfort to your living space.",
        13: "Classic denim jacket with modern fit. Durable denim fabric, comfortable wear, and timeless style. Perfect for casual outings and layering.",
        14: "Adjustable tablet stand with multiple viewing angles. Sturdy construction, foldable design, and compatible with all tablet sizes. Perfect for work or entertainment.",
        15: "Luxury lipstick set featuring 6 vibrant shades. Long-lasting formula, smooth application, and moisturizing ingredients. Complete your makeup collection.",
        16: "Comprehensive cookbook with over 200 recipes. Beautiful photography, step-by-step instructions, and tips from professional chefs. Perfect for home cooks.",
    };

    const specifications: Record<number, Record<string, string>> = {
        1: { "Battery Life": "30 hours", "Connectivity": "Bluetooth 5.0", "Weight": "250g", "Noise Cancellation": "Active" },
        2: { "Battery Life": "5 days", "Display": "1.4 inch AMOLED", "Water Resistance": "5 ATM", "Sensors": "Heart rate, GPS, Accelerometer" },
        3: { "Material": "Aluminum", "Weight": "800g", "Max Height": "20cm", "Compatibility": "All laptop sizes" },
        4: { "Ports": "HDMI, USB 3.0 x2, SD Card, USB-C PD", "Dimensions": "12 x 5 x 1.5 cm", "Weight": "100g" },
        5: { "Material": "100% Organic Cotton", "Care": "Machine washable", "Fit": "Regular" },
        6: { "Material": "Mesh upper, Rubber sole", "Weight": "280g", "Sizes": "US 6-12" },
        7: { "Capacity": "12 cups", "Material": "Stainless steel", "Features": "Programmable, Thermal carafe" },
        8: { "Pages": "350", "Format": "Paperback", "Language": "English" },
        9: { "Items": "4 products", "Skin Type": "All types", "Volume": "Full size" },
        10: { "Battery": "18 months", "Connectivity": "2.4GHz wireless", "DPI": "1600" },
        11: { "Dimensions": "183 x 61 cm", "Thickness": "6mm", "Material": "TPE" },
        12: { "Quantity": "4 pillows", "Size": "18 x 18 inches", "Material": "Polyester" },
        13: { "Material": "100% Cotton Denim", "Fit": "Regular", "Care": "Machine washable" },
        14: { "Material": "Aluminum", "Adjustable": "Yes", "Compatibility": "All tablets" },
        15: { "Quantity": "6 shades", "Weight": "3.5g each", "Finish": "Matte" },
        16: { "Pages": "400", "Recipes": "200+", "Format": "Hardcover" },
    };

    return {
        ...product,
        description: descriptions[id] || "Premium quality product with excellent features and design.",
        specifications: specifications[id] || {},
    };
};

// Reviews data
export const getProductReviews = (productId: number) => {
    const reviews: Record<number, Array<{ id: number; name: string; rating: number; comment: string; date: string }>> = {
        1: [
            { id: 1, name: "John D.", rating: 5, comment: "Excellent sound quality and battery life. Very comfortable for long listening sessions.", date: "2024-01-15" },
            { id: 2, name: "Sarah M.", rating: 4, comment: "Great headphones, noise cancellation works well. Only minor issue is the size.", date: "2024-01-10" },
            { id: 3, name: "Mike T.", rating: 5, comment: "Best headphones I've owned. Worth every penny!", date: "2024-01-05" },
        ],
        2: [
            { id: 1, name: "Emma L.", rating: 5, comment: "Love this smartwatch! Tracks everything I need and looks great.", date: "2024-01-12" },
            { id: 2, name: "David K.", rating: 4, comment: "Good features and battery life. Interface could be more intuitive.", date: "2024-01-08" },
        ],
    };

    return reviews[productId] || [
        { id: 1, name: "Customer", rating: 4, comment: "Great product, highly recommend!", date: "2024-01-01" },
    ];
};