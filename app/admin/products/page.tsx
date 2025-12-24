// app/admin/products/page.tsx
'use client';

import Link from "next/link"
import { useState } from "react";
import {
    Search,
    Filter,
    Plus,
    Edit,
    Trash2,
    Eye,
    MoreHorizontal,
    Package,
    ChevronDown,
    Upload,
    Download
} from "lucide-react";

// Mock data
const products = [
    {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        category: 'Electronics',
        price: '$129.99',
        stock: 45,
        status: 'active',
        image: '/api/placeholder/80/80',
        sales: 124,
        revenue: '$15,480'
    },
    {
        id: 2,
        name: 'Smart Fitness Watch',
        category: 'Electronics',
        price: '$199.99',
        stock: 12,
        status: 'active',
        image: '/api/placeholder/80/80',
        sales: 89,
        revenue: '$13,350'
    },
    {
        id: 3,
        name: 'Laptop Backpack',
        category: 'Accessories',
        price: '$49.99',
        stock: 78,
        status: 'active',
        image: '/api/placeholder/80/80',
        sales: 156,
        revenue: '$7,800'
    },
    {
        id: 4,
        name: 'Phone Case - Matte Black',
        category: 'Accessories',
        price: '$19.99',
        stock: 231,
        status: 'active',
        image: '/api/placeholder/80/80',
        sales: 203,
        revenue: '$4,060'
    },
    {
        id: 5,
        name: 'Mechanical Keyboard',
        category: 'Electronics',
        price: '$89.99',
        stock: 0,
        status: 'out-of-stock',
        image: '/api/placeholder/80/80',
        sales: 67,
        revenue: '$6,030'
    },
    {
        id: 6,
        name: 'Wireless Mouse',
        category: 'Electronics',
        price: '$39.99',
        stock: 23,
        status: 'active',
        image: '/api/placeholder/80/80',
        sales: 145,
        revenue: '$5,800'
    }
];

const categories = ['All Categories', 'Electronics', 'Accessories', 'Clothing', 'Home'];
const statuses = ['All Status', 'Active', 'Out of Stock', 'Draft'];

const ProductsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedStatus, setSelectedStatus] = useState('All Status');
    const [sortBy, setSortBy] = useState('name');

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
        const matchesStatus = selectedStatus === 'All Status' ||
            (selectedStatus === 'Active' && product.status === 'active') ||
            (selectedStatus === 'Out of Stock' && product.status === 'out-of-stock') ||
            (selectedStatus === 'Draft' && product.status === 'draft');

        return matchesSearch && matchesCategory && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-12 md:py-16 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden rounded-2xl mb-8">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm mb-4 text-white/80">
                            <Link href="/admin" className="hover:text-white transition-colors">
                                Admin
                            </Link>
                            <span>/</span>
                            <span className="text-white">Products</span>
                        </nav>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-slide-in-top">
                            Product Management
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 animate-slide-in-top animate-delay-100">
                            Manage your product catalog and inventory
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div>
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/20 dark:bg-gray-800/80 animate-slide-in-top">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
                            </div>
                            <div className="w-12 h-12 bg-linear-to-r from-primary-blue to-primary-purple rounded-xl flex items-center justify-center">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">+12% from last month</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/20 dark:bg-gray-800/80 animate-slide-in-top animate-delay-75">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
                            </div>
                            <div className="w-12 h-12 bg-linear-to-r from-primary-pink to-accent-pink rounded-xl flex items-center justify-center">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">Need restocking</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/20 dark:bg-gray-800/80 animate-slide-in-top animate-delay-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Out of Stock</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
                            </div>
                            <div className="w-12 h-12 bg-linear-to-r from-accent-yellow to-primary-pink rounded-xl flex items-center justify-center">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <p className="text-sm text-red-600 dark:text-red-400 mt-2">Urgent attention needed</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/20 dark:bg-gray-800/80 animate-slide-in-top animate-delay-150">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">$45,280</p>
                            </div>
                            <div className="w-12 h-12 bg-linear-to-r from-accent-green to-primary-blue rounded-xl flex items-center justify-center">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">+18% from last month</p>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/20 dark:bg-gray-800/80 p-6 mb-6 animate-slide-in-top">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex flex-col sm:flex-row gap-4 flex-1">
                            {/* Search */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                />
                            </div>

                            {/* Filters */}
                            <div className="flex gap-3">
                                <select
                                    title="categories"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>

                                <select
                                    title="status"
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                >
                                    {statuses.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors">
                                <Upload className="w-4 h-4" />
                                <span>Import</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors">
                                <Download className="w-4 h-4" />
                                <span>Export</span>
                            </button>
                            <Link
                                href="/admin/products/new"
                                className="flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-primary-blue to-primary-purple text-white rounded-xl hover:opacity-90 transition-opacity"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Product</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/20 dark:bg-gray-800/80 overflow-hidden animate-slide-in-bottom">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200/20 dark:border-gray-700/20">
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Product</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Category</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Price</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Stock</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Status</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Sales</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200/20 dark:divide-gray-700/20">
                                {filteredProducts.map((product, index) => (
                                    <tr
                                        key={product.id}
                                        className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors animate-slide-in-left"
                                        style={{ animationDelay: `${index * 0.05}s` }}
                                    >
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-linear-to-r from-accent-pink to-primary-purple rounded-lg flex items-center justify-center">
                                                    <Package className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">SKU: {product.id.toString().padStart(6, '0')}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">{product.price}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-2">
                                                <span className={product.stock < 10 ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-900 dark:text-white'}>
                                                    {product.stock}
                                                </span>
                                                {product.stock < 10 && product.stock > 0 && (
                                                    <span className="text-xs text-red-600 dark:text-red-400">Low</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === 'active'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                                }`}>
                                                {product.status === 'active' ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{product.sales} units</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{product.revenue}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-2">
                                                <button className="p-2 text-gray-400 hover:text-primary-blue transition-colors" title="View">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-primary-purple transition-colors" title="Edit">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-primary-pink transition-colors" title="Delete">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="More">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-200/20 dark:border-gray-700/20">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of{' '}
                                <span className="font-medium">156</span> products
                            </p>
                            <div className="flex space-x-2">
                                <button className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors">
                                    Previous
                                </button>
                                <button className="px-3 py-1 rounded-lg bg-linear-to-r from-primary-blue to-primary-purple text-white">
                                    1
                                </button>
                                <button className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors">
                                    2
                                </button>
                                <button className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsPage