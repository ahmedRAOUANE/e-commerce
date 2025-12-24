// app/admin/products/new/page.tsx
'use client';

import Link from "next/link";
import { useState } from "react";
import {
    ArrowLeft,
    Upload,
    Package,
    DollarSign,
    BarChart3,
    Truck,
    Eye,
    Save,
    X,
    Image as ImageIcon,
    Tag
} from "lucide-react";
import Image from "next/image";

const NewProductPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        comparePrice: '',
        costPerItem: '',
        sku: '',
        barcode: '',
        quantity: '',
        weight: '',
        length: '',
        width: '',
        height: '',
        seoTitle: '',
        seoDescription: '',
        status: 'draft'
    });

    const [images, setImages] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            // In a real app, you would upload to a cloud service
            // For now, we'll create object URLs for preview
            const newImages = Array.from(files).map(file => URL.createObjectURL(file));
            setImages(prev => [...prev, ...newImages]);
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const addTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags(prev => [...prev, tagInput.trim()]);
            setTagInput('');
        }
    };

    const removeTag = (index: number) => {
        setTags(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log({ ...formData, images, tags });
    };

    const categories = [
        'Electronics',
        'Accessories',
        'Clothing',
        'Home & Garden',
        'Beauty & Health',
        'Sports & Outdoors',
        'Toys & Games'
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-8 md:py-12 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden rounded-2xl mb-8">
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
                            <Link href="/admin/products" className="hover:text-white transition-colors">
                                Products
                            </Link>
                            <span>/</span>
                            <span className="text-white">New Product</span>
                        </nav>

                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 animate-slide-in-top">
                                    Add New Product
                                </h1>
                                <p className="text-lg text-white/90 animate-slide-in-top animate-delay-100">
                                    Create a new product for your store
                                </p>
                            </div>
                            <Link
                                href="/admin/products"
                                className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-lg rounded-xl hover:bg-white/30 transition-all duration-200"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Back to Products</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Main Form */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Basic Information */}
                            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/20 dark:bg-gray-800/80 p-6 animate-slide-in-left">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 bg-linear-to-r from-primary-blue to-primary-purple rounded-xl flex items-center justify-center">
                                        <Package className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Basic Information</h2>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Product Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                            placeholder="Enter product name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                            placeholder="Enter product description"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Category *
                                            </label>
                                            <select
                                                title="category"
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                            >
                                                <option value="">Select a category</option>
                                                {categories.map(category => (
                                                    <option key={category} value={category}>{category}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Status
                                            </label>
                                            <select
                                                title="status"
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                            >
                                                <option value="draft">Draft</option>
                                                <option value="active">Active</option>
                                                <option value="archived">Archived</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/20 dark:bg-gray-800/80 p-6 animate-slide-in-left animate-delay-100">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 bg-linear-to-r from-primary-purple to-primary-pink rounded-xl flex items-center justify-center">
                                        <DollarSign className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pricing</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Price *
                                        </label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleInputChange}
                                                required
                                                step="0.01"
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Compare at Price
                                        </label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="number"
                                                name="comparePrice"
                                                value={formData.comparePrice}
                                                onChange={handleInputChange}
                                                step="0.01"
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Cost per Item
                                        </label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="number"
                                                name="costPerItem"
                                                value={formData.costPerItem}
                                                onChange={handleInputChange}
                                                step="0.01"
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Inventory */}
                            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/20 dark:bg-gray-800/80 p-6 animate-slide-in-left animate-delay-150">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 bg-linear-to-r from-accent-green to-primary-blue rounded-xl flex items-center justify-center">
                                        <BarChart3 className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Inventory</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            SKU
                                        </label>
                                        <input
                                            type="text"
                                            name="sku"
                                            value={formData.sku}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                            placeholder="SKU-001"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Barcode
                                        </label>
                                        <input
                                            type="text"
                                            name="barcode"
                                            value={formData.barcode}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                            placeholder="123456789"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Quantity *
                                        </label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={formData.quantity}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping */}
                            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/20 dark:bg-gray-800/80 p-6 animate-slide-in-left animate-delay-200">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 bg-linear-to-r from-accent-yellow to-primary-pink rounded-xl flex items-center justify-center">
                                        <Truck className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Shipping</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Weight (kg)
                                        </label>
                                        <input
                                            type="number"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleInputChange}
                                            step="0.01"
                                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                            placeholder="0.00"
                                        />
                                    </div>

                                    <div className="grid grid-cols-3 gap-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Length
                                            </label>
                                            <input
                                                type="number"
                                                name="length"
                                                value={formData.length}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                                placeholder="cm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Width
                                            </label>
                                            <input
                                                type="number"
                                                name="width"
                                                value={formData.width}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                                placeholder="cm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Height
                                            </label>
                                            <input
                                                type="number"
                                                name="height"
                                                value={formData.height}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                                placeholder="cm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-8">
                            {/* Image Upload */}
                            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/20 dark:bg-gray-800/80 p-6 animate-slide-in-right">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 bg-linear-to-r from-accent-pink to-primary-purple rounded-xl flex items-center justify-center">
                                        <ImageIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Product Images</h2>
                                </div>

                                <div className="space-y-4">
                                    {
                                        images.length > 0 ? (
                                            <div className="w-full flex justify-end">
                                                <input
                                                    type="file"
                                                    multiple
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                    id="image-upload"
                                                />

                                                <label
                                                    htmlFor="image-upload"
                                                    className="inline-flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-primary-blue to-primary-purple text-white rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
                                                >
                                                    <Upload className="w-4 h-4" />
                                                    <span>Choose Files</span>
                                                </label>
                                            </div>
                                        ) : (
                                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center">
                                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                    Drag & drop images here or click to upload
                                                </p>
                                                <input
                                                    type="file"
                                                    multiple
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                    id="image-upload"
                                                />
                                                <label
                                                    htmlFor="image-upload"
                                                    className="inline-flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-primary-blue to-primary-purple text-white rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
                                                >
                                                    <Upload className="w-4 h-4" />
                                                    <span>Choose Files</span>
                                                </label>
                                            </div>
                                        )
                                    }

                                    {/* Image Previews */}
                                    {images.length > 0 && (
                                        <div className="grid grid-cols-3 gap-2">
                                            {images.map((image, index) => (
                                                <div key={index} className="relative group">
                                                    <Image
                                                        width={200}
                                                        height={200}
                                                        src={image}
                                                        alt={`Preview ${index + 1}`}
                                                        className="w-full h-20 object-cover rounded-lg"
                                                    />
                                                    <button
                                                        title="remove this image"
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="w-4 h-4 mx-auto" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/20 dark:bg-gray-800/80 p-6 animate-slide-in-right animate-delay-100">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 bg-linear-to-r from-primary-blue to-accent-green rounded-xl flex items-center justify-center">
                                        <Tag className="w-5 h-5 text-white" />
                                    </div>

                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Product Tags</h2>
                                </div>

                                <div className="space-y-4 max-w-full">
                                    <div className="flex gap-2 flex-1">
                                        <input
                                            name="tag"
                                            id="tag"
                                            type="text"
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                            className=" px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                            placeholder="Add a tag"
                                        />
                                        <button
                                            type="button"
                                            onClick={addTag}
                                            className=" px-4 py-2 bg-linear-to-r from-primary-purple to-primary-pink text-white rounded-xl hover:opacity-90 transition-opacity"
                                        >
                                            Add
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center space-x-1 px-3 py-1 bg-linear-to-r from-primary-blue/20 to-primary-purple/20 text-primary-blue dark:text-primary-purple rounded-full text-sm"
                                            >
                                                <span>{tag}</span>
                                                <button
                                                    title="remove tag"
                                                    type="button"
                                                    onClick={() => removeTag(index)}
                                                    className="hover:text-red-500 transition-colors"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* SEO */}
                            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/20 dark:bg-gray-800/80 p-6 animate-slide-in-right animate-delay-150">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 bg-linear-to-r from-primary-purple to-accent-pink rounded-xl flex items-center justify-center">
                                        <Eye className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">SEO</h2>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            SEO Title
                                        </label>
                                        <input
                                            type="text"
                                            name="seoTitle"
                                            value={formData.seoTitle}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                            placeholder="SEO title"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            SEO Description
                                        </label>
                                        <textarea
                                            name="seoDescription"
                                            value={formData.seoDescription}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                            placeholder="SEO description"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/20 dark:bg-gray-800/80 p-6 animate-slide-in-right animate-delay-200">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Actions</h2>
                                <div className="space-y-3">
                                    <button
                                        type="submit"
                                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-linear-to-r from-primary-blue to-primary-purple text-white rounded-xl hover:opacity-90 transition-opacity"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>Save Product</span>
                                    </button>

                                    <button
                                        type="button"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Save as Draft
                                    </button>

                                    <Link
                                        href="/admin/products"
                                        className="block w-full text-center px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewProductPage;