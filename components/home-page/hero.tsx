import Link from 'next/link';

const Hero = () => {
    return (
        <section className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden bg-linear-to-br from-blue-600 via-purple-600 to-pink-600">
            {/* Animated background shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        New Collection Available Now
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        Discover Amazing
                        <span className="block bg-linear-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                            Products
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
                        Shop the latest trends with our curated collection of premium products at unbeatable prices
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <Link
                            href="/products"
                            className="group relative px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
                        >
                            <span className="relative z-10">Shop Now</span>
                            <div className="absolute inset-0 bg-linear-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </Link>
                        <Link
                            href="/categories"
                            className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
                        >
                            Browse Categories
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-16">
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-6">
                            <div className="text-2xl md:text-3xl font-bold text-white mb-1">10K+</div>
                            <div className="text-sm md:text-base text-white/80">Products</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-6">
                            <div className="text-2xl md:text-3xl font-bold text-white mb-1">50K+</div>
                            <div className="text-sm md:text-base text-white/80">Customers</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-6">
                            <div className="text-2xl md:text-3xl font-bold text-white mb-1">100+</div>
                            <div className="text-sm md:text-base text-white/80">Categories</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-6">
                            <div className="text-2xl md:text-3xl font-bold text-white mb-1">4.9★</div>
                            <div className="text-sm md:text-base text-white/80">Rating</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom wave decoration */}
            {/* <div className="absolute bottom-0 left-0 right-0">
                <svg
                    className="w-full h-12 md:h-20"
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                        fill="var(--background)"
                    />
                </svg>
            </div> */}
        </section>
    );
};

export default Hero;
