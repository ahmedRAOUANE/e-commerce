// app/admin/customers/page.tsx
'use client';

import Link from "next/link";
import { useState } from "react";
import {
    Search,
    Edit,
    Eye,
    MoreHorizontal,
    User,
    Users,
    DollarSign,
    TrendingUp,
    Mail,
    MapPin,
    Download,
    Send
} from "lucide-react";

// Mock data
const customers = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, USA',
        orders: 12,
        totalSpent: '$1,248.50',
        status: 'active',
        lastOrder: '2024-01-15',
        joinDate: '2023-05-20'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+1 (555) 987-6543',
        location: 'Los Angeles, USA',
        orders: 8,
        totalSpent: '$892.75',
        status: 'active',
        lastOrder: '2024-01-14',
        joinDate: '2023-08-15'
    },
    {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.j@example.com',
        phone: '+1 (555) 456-7890',
        location: 'Chicago, USA',
        orders: 5,
        totalSpent: '$567.30',
        status: 'active',
        lastOrder: '2024-01-10',
        joinDate: '2023-11-30'
    },
    {
        id: 4,
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        phone: '+1 (555) 234-5678',
        location: 'Miami, USA',
        orders: 3,
        totalSpent: '$324.90',
        status: 'inactive',
        lastOrder: '2023-12-20',
        joinDate: '2023-09-10'
    },
    {
        id: 5,
        name: 'Tom Brown',
        email: 'tom.brown@example.com',
        phone: '+1 (555) 876-5432',
        location: 'Seattle, USA',
        orders: 15,
        totalSpent: '$2,156.80',
        status: 'active',
        lastOrder: '2024-01-12',
        joinDate: '2023-04-05'
    },
    {
        id: 6,
        name: 'Lisa Davis',
        email: 'lisa.davis@example.com',
        phone: '+1 (555) 345-6789',
        location: 'Boston, USA',
        orders: 0,
        totalSpent: '$0.00',
        status: 'new',
        lastOrder: '-',
        joinDate: '2024-01-15'
    }
];

const statuses = ['All Status', 'Active', 'Inactive', 'New'];
const locations = ['All Locations', 'New York', 'Los Angeles', 'Chicago', 'Miami', 'Seattle', 'Boston'];

const CustomersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All Status');
    const [selectedLocation, setSelectedLocation] = useState('All Locations');
    const [isSendEmailModalOpen, setIsSendEmailModalOpen] = useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            case 'inactive': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
            case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
        }
    };

    const filteredCustomers = customers.filter(customer => {
        const matchesSearch =
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone.includes(searchTerm);

        const matchesStatus = selectedStatus === 'All Status' ||
            customer.status === selectedStatus.toLowerCase();

        const matchesLocation = selectedLocation === 'All Locations' ||
            customer.location.includes(selectedLocation);

        return matchesSearch && matchesStatus && matchesLocation;
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
                            <span className="text-white">Customers</span>
                        </nav>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-slide-in-top">
                            Customer Management
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 animate-slide-in-top animate-delay-100">
                            Manage and engage with your customers
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
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Customers</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">1,892</p>
                            </div>
                            <div className="w-12 h-12 bg-linear-to-r from-primary-blue to-primary-purple rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">+8% from last month</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/20 dark:bg-gray-800/80 animate-slide-in-top animate-delay-75">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">New Customers</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">124</p>
                            </div>
                            <div className="w-12 h-12 bg-linear-to-r from-primary-purple to-primary-pink rounded-xl flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">This month</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/20 dark:bg-gray-800/80 animate-slide-in-top animate-delay-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Order Value</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">$89.50</p>
                            </div>
                            <div className="w-12 h-12 bg-linear-to-r from-accent-green to-primary-blue rounded-xl flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">+5% from last month</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/20 dark:bg-gray-800/80 animate-slide-in-top animate-delay-150">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Customer Satisfaction</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8/5</p>
                            </div>
                            <div className="w-12 h-12 bg-linear-to-r from-accent-pink to-primary-purple rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">+0.2 from last month</p>
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
                                    placeholder="Search customers by name, email, or phone..."
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

                                <select
                                    title="location"
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                    className="px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                >
                                    {locations.map(location => (
                                        <option key={location} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors">
                                <Download className="w-4 h-4" />
                                <span>Export</span>
                            </button>
                            <button
                                onClick={() => setIsSendEmailModalOpen(true)}
                                className="flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-primary-blue to-primary-purple text-white rounded-xl hover:opacity-90 transition-opacity"
                            >
                                <Send className="w-4 h-4" />
                                <span>Send Email</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Customers Table */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/20 dark:bg-gray-800/80 overflow-hidden animate-slide-in-bottom">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200/20 dark:border-gray-700/20">
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Customer</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Contact</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Location</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Orders</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Total Spent</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Status</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Last Order</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200/20 dark:divide-gray-700/20">
                                {filteredCustomers.map((customer, index) => (
                                    <tr
                                        key={customer.id}
                                        className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors animate-slide-in-left"
                                        style={{ animationDelay: `${index * 0.05}s` }}
                                    >
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-linear-to-r from-accent-pink to-primary-purple rounded-full flex items-center justify-center">
                                                    <span className="text-white font-semibold text-sm">
                                                        {customer.name.split(' ').map(n => n[0]).join('')}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">{customer.name}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Joined {new Date(customer.joinDate).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div>
                                                <p className="text-gray-900 dark:text-white">{customer.email}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{customer.phone}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-1 text-gray-900 dark:text-white">
                                                <MapPin className="w-4 h-4 text-gray-400" />
                                                <span>{customer.location}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="font-medium text-gray-900 dark:text-white">{customer.orders}</span>
                                        </td>
                                        <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">{customer.totalSpent}</td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                                                <span className="capitalize">{customer.status}</span>
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-gray-900 dark:text-white">{customer.lastOrder}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-2">
                                                <button className="p-2 text-gray-400 hover:text-primary-blue transition-colors" title="View Profile">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-primary-purple transition-colors" title="Edit Customer">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-primary-pink transition-colors" title="Send Email">
                                                    <Mail className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="More Options">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {filteredCustomers.length === 0 && (
                        <div className="text-center py-12">
                            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No customers found</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">
                                {searchTerm || selectedStatus !== 'All Status' || selectedLocation !== 'All Locations'
                                    ? 'Try adjusting your search or filters to find what you are looking for.'
                                    : 'No customers have been registered yet.'
                                }
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredCustomers.length > 0 && (
                        <div className="px-6 py-4 border-t border-gray-200/20 dark:border-gray-700/20">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredCustomers.length}</span> of{' '}
                                    <span className="font-medium">1,892</span> customers
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
                    )}
                </div>

                {/* Customer Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                    {/* Top Customers */}
                    <div className="lg:col-span-2 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/20 dark:bg-gray-800/80 p-6 animate-slide-in-bottom">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Top Customers</h2>
                        <div className="space-y-4">
                            {filteredCustomers
                                .filter(customer => customer.orders > 0)
                                .sort((a, b) => parseFloat(b.totalSpent.replace('$', '')) - parseFloat(a.totalSpent.replace('$', '')))
                                .slice(0, 4)
                                .map((customer) => (
                                    <div key={customer.id} className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-linear-to-r from-accent-pink to-primary-purple rounded-full flex items-center justify-center">
                                                <span className="text-white font-semibold text-sm">
                                                    {customer.name.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{customer.name}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{customer.orders} orders</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-900 dark:text-white">{customer.totalSpent}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Total spent</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Customer Engagement */}
                    <div className="bg-linear-to-br from-primary-blue via-primary-purple to-primary-pink rounded-2xl p-6 text-white animate-zoom-in">
                        <h2 className="text-xl font-semibold mb-4">Customer Engagement</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span>Email Subscribers</span>
                                <span className="font-semibold">1,452</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Newsletter Opens</span>
                                <span className="font-semibold">42%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Repeat Customers</span>
                                <span className="font-semibold">68%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Avg. Lifetime Value</span>
                                <span className="font-semibold">$289.50</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/20">
                            <p className="text-sm text-white/80 mb-3">Engage with your customers</p>
                            <button
                                onClick={() => setIsSendEmailModalOpen(true)}
                                className="w-full bg-white text-primary-purple py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                            >
                                Send Newsletter
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Send Email Modal */}
            {isSendEmailModalOpen && (
                <div className="fixed inset-0 bg-primary-purple/10 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
                    <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/20 dark:bg-gray-800/90 w-full max-w-md animate-zoom-in">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Send Email</h2>
                                <button
                                    title="send email" 
                                    onClick={() => setIsSendEmailModalOpen(false)}
                                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>

                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Recipients
                                    </label>
                                    <select title="filter" className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700">
                                        <option value="all">All Customers</option>
                                        <option value="active">Active Customers</option>
                                        <option value="inactive">Inactive Customers</option>
                                        <option value="new">New Customers</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                        placeholder="Enter email subject"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                        placeholder="Enter your message"
                                    />
                                </div>

                                <div className="flex space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsSendEmailModalOpen(false)}
                                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-3 bg-linear-to-r from-primary-blue to-primary-purple text-white rounded-xl hover:opacity-90 transition-opacity"
                                    >
                                        Send Email
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

export default CustomersPage;