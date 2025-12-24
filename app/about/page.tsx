"use client";

import Header from "@/components/home-page/header";
import Link from "next/link";

const ValueCard = ({
    icon,
    title,
    description,
}: {
    icon: string;
    title: string;
    description: string;
}) => {
    return (
        <div className="group relative bg-background border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 sm:p-8 hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10 transition-all duration-300 hover:-translate-y-2">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300 z-0 rounded-2xl"></div>

            <div className="relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <h3 className="font-bold text-xl sm:text-2xl mb-2 sm:mb-3 text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

const AboutPage = () => {
    const values = [
        {
            icon: "🎯",
            title: "Quality First",
            description: "We are committed to providing only the highest quality products that meet and exceed customer expectations.",
        },
        {
            icon: "💡",
            title: "Innovation",
            description: "We continuously innovate and improve our offerings to stay ahead of market trends and customer needs.",
        },
        {
            icon: "🤝",
            title: "Customer Focus",
            description: "Our customers are at the heart of everything we do. We prioritize their satisfaction and experience.",
        },
        {
            icon: "🌍",
            title: "Sustainability",
            description: "We are committed to sustainable practices and environmental responsibility in all our operations.",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-12 md:py-16 lg:py-20 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
                    </div>

                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>

                    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                Our Story
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                                About
                                <span className="block bg-linear-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                                    Us
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
                                We are a trusted online marketplace dedicated to providing quality products and exceptional customer service
                            </p>
                        </div>
                    </div>
                </section>

                {/* About Us Content */}
                <section className="py-12 md:py-16 bg-background">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                                    Who We Are
                                </h2>
                                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                    Founded with a vision to revolutionize online shopping, we have grown from a small startup to a trusted e-commerce platform serving thousands of customers worldwide. Our journey began with a simple mission: to make quality products accessible to everyone, everywhere.
                                </p>
                                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                    Today, we offer a curated selection of products across multiple categories, carefully chosen to meet the highest standards of quality and value. We believe in building lasting relationships with our customers through transparency, reliability, and exceptional service.
                                </p>
                                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Our team is passionate about what we do, constantly working to improve your shopping experience and bring you the latest products at competitive prices. We are more than just an e-commerce platform—we are your trusted partner in finding the perfect products for your needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
                            {/* Mission */}
                            <div className="bg-background border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 mb-6 bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl">
                                    🎯
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                                    Our Mission
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                    To provide customers with access to high-quality products at competitive prices while delivering exceptional service and building trust through transparency and reliability.
                                </p>
                            </div>

                            {/* Vision */}
                            <div className="bg-background border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 mb-6 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl">
                                    👁️
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                                    Our Vision
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                    To become the world&apos;s most trusted and customer-centric e-commerce platform, known for quality, innovation, and exceptional customer experiences.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-12 md:py-16 bg-background">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-8 sm:mb-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-3">
                                <span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></span>
                                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                                    Our Values
                                </span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2 sm:mb-3">
                                What We Stand For
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                The principles that guide everything we do
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                            {values.map((value, index) => (
                                <ValueCard
                                    key={index}
                                    icon={value.icon}
                                    title={value.title}
                                    description={value.description}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="relative py-12 md:py-16 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    </div>

                    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-8 sm:mb-12">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3">
                                Our Impact
                            </h2>
                            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
                                Numbers that reflect our commitment to excellence
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8 text-center">
                                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                                    50K+
                                </div>
                                <div className="text-sm sm:text-base text-white/80 font-medium">
                                    Happy Customers
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8 text-center">
                                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                                    10K+
                                </div>
                                <div className="text-sm sm:text-base text-white/80 font-medium">
                                    Products
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8 text-center">
                                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                                    100+
                                </div>
                                <div className="text-sm sm:text-base text-white/80 font-medium">
                                    Categories
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8 text-center">
                                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                                    4.9★
                                </div>
                                <div className="text-sm sm:text-base text-white/80 font-medium">
                                    Average Rating
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                                Join Us on Our Journey
                            </h2>
                            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 leading-relaxed">
                                Experience the difference of shopping with a platform that truly cares about your satisfaction. Browse our products and discover why thousands of customers trust us.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href="/products"
                                    className="group relative px-8 py-4 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
                                >
                                    <span className="relative z-10">Shop Now</span>
                                    <div className="absolute inset-0 bg-linear-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </Link>
                                <Link
                                    href="/contact"
                                    className="px-8 py-4 bg-background border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 rounded-full font-semibold text-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AboutPage;
