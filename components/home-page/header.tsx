"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isMobileMenuOpen && !target.closest(".mobile-menu") && !target.closest(".mobile-menu-button")) {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full">
            <div className="relative">
                {/* Blur background effect */}
                <div className="absolute inset-0 bg-background/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50"></div>
                
                {/* Content */}
                <div className="relative flex justify-between items-center px-4 md:px-6 lg:px-8 py-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 z-10" onClick={closeMobileMenu}>
                        <div className="w-10 h-10 bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">E</span>
                        </div>
                        <span className="text-xl font-bold text-foreground hidden sm:block">
                            E-Commerce
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        <Link 
                            href="/" 
                            className="text-foreground hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors relative group"
                        >
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 transition-all group-hover:w-full"></span>
                        </Link>

                        <Link 
                            href="/products" 
                            className="text-foreground hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors relative group"
                        >
                            Products
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 transition-all group-hover:w-full"></span>
                        </Link>

                        <Link 
                            href="/categories" 
                            className="text-foreground hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors relative group"
                        >
                            Categories
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 transition-all group-hover:w-full"></span>
                        </Link>

                        {/* <Link 
                            href="/about" 
                            className="text-foreground hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors relative group"
                        >
                            About
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 transition-all group-hover:w-full"></span>
                        </Link> */}
                    </nav>

                    {/* Right side: Search, Cart, Menu */}
                    <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 z-10">
                        {/* Desktop Search Bar */}
                        <div className="hidden md:flex items-center justify-end w-96">
                            <div
                                className={`relative flex items-center transition-all duration-300 ${
                                    isSearchFocused
                                        ? "w-64 md:w-80"
                                        : "w-40 md:w-48"
                                }`}
                            >
                                <div className="absolute left-3 pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    placeholder="Search products..."
                                    className="w-full pl-10 pr-4 py-2 bg-background/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-700/50 rounded-full text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                />
                            </div>
                        </div>

                        {/* Mobile Search Icon */}
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Search"
                        >
                            <svg
                                className="w-6 h-6 text-foreground"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>

                        {/* Cart Icon */}
                        <Link
                            href="/cart"
                            className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                            aria-label="Shopping cart"
                            onClick={closeMobileMenu}
                        >
                            <svg 
                                className="w-6 h-6 text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                                />
                            </svg>
                            <span className="absolute top-0 right-0 w-5 h-5 bg-linear-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                                0
                            </span>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="mobile-menu-button md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMobileMenuOpen ? (
                                <svg 
                                    className="w-6 h-6 text-foreground" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M6 18L18 6M6 6l12 12" 
                                    />
                                </svg>
                            ) : (
                                <svg 
                                    className="w-6 h-6 text-foreground" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M4 6h16M4 12h16M4 18h16" 
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fade-in"
                        onClick={closeMobileMenu}
                    ></div>

                    {/* Mobile Menu */}
                    <div
                        className="mobile-menu fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l border-gray-200 dark:border-gray-800 shadow-2xl z-50 md:hidden animate-slide-in-right"
                    >
                        <div className="flex flex-col h-full">
                            {/* Mobile Menu Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 animate-slide-in-top">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center animate-zoom-in animate-delay-100 animate-fill-both">
                                        <span className="text-white font-bold text-lg">E</span>
                                    </div>
                                    <span className="text-lg font-bold text-foreground">Menu</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={closeMobileMenu}
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-110 active:scale-95"
                                    aria-label="Close menu"
                                >
                                    <svg
                                        className="w-6 h-6 text-foreground"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Mobile Search */}
                            <div className="p-4 border-b border-gray-200 dark:border-gray-800 animate-slide-in-top animate-delay-75 animate-fill-both">
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                        <svg
                                            className="w-5 h-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="search"
                                        placeholder="Search products..."
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            {/* Mobile Navigation */}
                            <nav className="flex-1 overflow-y-auto p-4">
                                <div className="space-y-2">
                                    <Link
                                        href="/"
                                        onClick={closeMobileMenu}
                                        className="flex items-center px-4 py-3 rounded-lg text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-all group animate-slide-in-left animate-delay-100 animate-fill-both"
                                    >
                                        <span className="mr-3 text-xl group-hover:scale-110 transition-transform duration-200">🏠</span>
                                        <span>Home</span>
                                        <svg
                                            className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </Link>

                                    <Link
                                        href="/products"
                                        onClick={closeMobileMenu}
                                        className="flex items-center px-4 py-3 rounded-lg text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-all group animate-slide-in-left animate-delay-150 animate-fill-both"
                                    >
                                        <span className="mr-3 text-xl group-hover:scale-110 transition-transform duration-200">🛍️</span>
                                        <span>Products</span>
                                        <svg
                                            className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </Link>

                                    <Link
                                        href="/categories"
                                        onClick={closeMobileMenu}
                                        className="flex items-center px-4 py-3 rounded-lg text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-all group animate-slide-in-left animate-delay-200 animate-fill-both"
                                    >
                                        <span className="mr-3 text-xl group-hover:scale-110 transition-transform duration-200">📂</span>
                                        <span>Categories</span>
                                        <svg
                                            className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </Link>

                                    <Link
                                        href="/about"
                                        onClick={closeMobileMenu}
                                        className="flex items-center px-4 py-3 rounded-lg text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-all group animate-slide-in-left animate-delay-300 animate-fill-both"
                                    >
                                        <span className="mr-3 text-xl group-hover:scale-110 transition-transform duration-200">ℹ️</span>
                                        <span>About</span>
                                        <svg
                                            className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </nav>

                            {/* Mobile Menu Footer */}
                            <div className="p-4 border-t border-gray-200 dark:border-gray-800 animate-slide-in-bottom animate-delay-300 animate-fill-both">
                                <Link
                                    href="/cart"
                                    onClick={closeMobileMenu}
                                    className="flex items-center justify-center px-4 py-3 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105 active:scale-95"
                                >
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    View Cart (0)
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;
