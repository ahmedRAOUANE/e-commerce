// app/admin/categories/page.tsx
'use client';

import Link from "next/link";
import { useState } from "react";
import {
    Search,
    Plus,
    Edit,
    Trash2,
    MoreHorizontal,
    Folder,
    BarChart3,
    Eye,
    Upload,
    Download
} from "lucide-react";

// Mock data
const categories = [
    {
        id: 1,
        name: 'Electronics',
        description: 'Smartphones, laptops, and gadgets',
        products: 45,
        status: 'active',
        image: '/api/placeholder/80/80',
        createdAt: '2024-01-15'
    },
    {
        id: 2,
        name: 'Clothing',
        description: 'Men, women and kids fashion',
        products: 89,
        status: 'active',
        image: '/api/placeholder/80/80',
        createdAt: '2024-01-10'
    },
    {
        id: 3,
        name: 'Home & Garden',
        description: 'Furniture and home accessories',
        products: 34,
        status: 'active',
        image: '/api/placeholder/80/80',
        createdAt: '2024-01-08'
    },
    {
        id: 4,
        name: 'Sports & Outdoors',
        description: 'Sports equipment and outdoor gear',
        products: 23,
        status: 'active',
        image: '/api/placeholder/80/80',
        createdAt: '2024-01-05'
    },
    {
        id: 5,
        name: 'Beauty & Health',
        description: 'Cosmetics and health products',
        products: 67,
        status: 'active',
        image: '/api/placeholder/80/80',
        createdAt: '2024-01-03'
    },
    {
        id: 6,
        name: 'Toys & Games',
        description: 'Children toys and board games',
        products: 12,
        status: 'inactive',
        image: '/api/placeholder/80/80',
        createdAt: '2024-01-01'
    }
];

const statuses = ['All Status', 'Active', 'Inactive'];

const CategoriesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All Status');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newCategory, setNewCategory] = useState({
        name: '',
        description: '',
        status: 'active'
    });

    const filteredCategories = categories.filter(category => {
        const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === 'All Status' ||
            category.status === selectedStatus.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    const handleCreateCategory = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle category creation
        console.log('Creating category:', newCategory);
        setIsCreateModalOpen(false);
        setNewCategory({ name: '', description: '', status: 'active' });
    };

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
                            <span className="text-white">Categories</span>
                        </nav>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-slide-in-top">
                            Category Management
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 animate-slide-in-top animate-delay-100">
                            Organize your products with categories
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/20 dark:bg-gray-800/80 animate-slide-in-top">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Categories</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
                            </div>
                            <div className="w-12 h-12 bg-linear-to-r from-primary-blue to-primary-purple rounded-xl flex items-center justify-center">
                                <Folder className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">+3 new this month</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/20 dark:bg-gray-800/80 animate-slide-in-top animate-delay-75">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Categories</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">18</p>
                            </div>
                            <div className="w-12 h-12 bg-linear-to-r from-accent-green to-primary-blue rounded-xl flex items-center justify-center">
                                <BarChart3 className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">75% of total</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/20 dark:bg-gray-800/80 animate-slide-in-top animate-delay-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">1,248</p>
                            </div>
                            <div className="w-12 h-12 bg-linear-to-r from-primary-purple to-primary-pink rounded-xl flex items-center justify-center">
                                <Folder className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">Across all categories</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/20 dark:bg-gray-800/80 animate-slide-in-top animate-delay-150">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Products/Category</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">52</p>
                            </div>
                            <div className="w-12 h-12 bg-linear-to-r from-accent-pink to-primary-purple rounded-xl flex items-center justify-center">
                                <BarChart3 className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">Well distributed</p>
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
                                    placeholder="Search categories..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                />
                            </div>

                            {/* Filters */}
                            <div className="flex gap-3">
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
                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-primary-blue to-primary-purple text-white rounded-xl hover:opacity-90 transition-opacity"
                            >
                                <Plus className="w-4 h-4" />
                                <span>New Category</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredCategories.map((category, index) => (
                        <div
                            key={category.id}
                            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/20 dark:bg-gray-800/80 p-6 animate-slide-in-bottom"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-linear-to-r from-accent-pink to-primary-purple rounded-xl flex items-center justify-center">
                                        <Folder className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{category.products} products</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <button title="more" className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                {category.description}
                            </p>

                            <div className="flex items-center justify-between">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${category.status === 'active'
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                    }`}>
                                    {category.status === 'active' ? 'Active' : 'Inactive'}
                                </span>

                                <div className="flex items-center space-x-2">
                                    <button className="p-1 text-gray-400 hover:text-primary-blue transition-colors" title="View">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button className="p-1 text-gray-400 hover:text-primary-purple transition-colors" title="Edit">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button className="p-1 text-gray-400 hover:text-primary-pink transition-colors" title="Delete">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredCategories.length === 0 && (
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/20 dark:bg-gray-800/80 p-12 text-center animate-zoom-in">
                        <Folder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No categories found</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            {searchTerm || selectedStatus !== 'All Status'
                                ? 'Try adjusting your search or filter to find what you are looking for.'
                                : 'Get started by creating your first category.'
                            }
                        </p>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-primary-blue to-primary-purple text-white rounded-xl hover:opacity-90 transition-opacity"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Create Category</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Create Category Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-primary-purple/10 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
                    <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/20 dark:bg-gray-800/90 w-full max-w-md animate-zoom-in">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Create New Category</h2>
                                <button
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleCreateCategory} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Category Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={newCategory.name}
                                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                        placeholder="Enter category name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={newCategory.description}
                                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                        placeholder="Enter category description"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Status
                                    </label>
                                    <select
                                        title="category activity"
                                        value={newCategory.status}
                                        onChange={(e) => setNewCategory({ ...newCategory, status: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>

                                <div className="flex space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsCreateModalOpen(false)}
                                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-3 bg-linear-to-r from-primary-blue to-primary-purple text-white rounded-xl hover:opacity-90 transition-opacity"
                                    >
                                        Create Category
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;