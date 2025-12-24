// app/admin/orders/page.tsx
'use client';

import Link from "next/link";
import { useState } from "react";
import {
    Search,
    Filter,
    Edit,
    Eye,
    MoreHorizontal,
    ShoppingCart,
    Truck,
    CheckCircle,
    Clock,
    XCircle,
    Download,
    RefreshCw
} from "lucide-react";

// Mock data
const orders = [
    {
        id: 'ORD-001',
        customer: 'John Doe',
        email: 'john@example.com',
        date: '2024-01-15',
        amount: '$129.99',
        status: 'delivered',
        items: 2,
        payment: 'paid',
        shipping: 'express'
    },
    {
        id: 'ORD-002',
        customer: 'Jane Smith',
        email: 'jane@example.com',
        date: '2024-01-15',
        amount: '$89.99',
        status: 'processing',
        items: 1,
        payment: 'paid',
        shipping: 'standard'
    },
    {
        id: 'ORD-003',
        customer: 'Mike Johnson',
        email: 'mike@example.com',
        date: '2024-01-14',
        amount: '$249.99',
        status: 'shipped',
        items: 3,
        payment: 'paid',
        shipping: 'express'
    },
    {
        id: 'ORD-004',
        customer: 'Sarah Wilson',
        email: 'sarah@example.com',
        date: '2024-01-14',
        amount: '$59.99',
        status: 'pending',
        items: 1,
        payment: 'pending',
        shipping: 'standard'
    },
    {
        id: 'ORD-005',
        customer: 'Tom Brown',
        email: 'tom@example.com',
        date: '2024-01-13',
        amount: '$179.99',
        status: 'delivered',
        items: 2,
        payment: 'paid',
        shipping: 'standard'
    },
    {
        id: 'ORD-006',
        customer: 'Lisa Davis',
        email: 'lisa@example.com',
        date: '2024-01-13',
        amount: '$299.99',
        status: 'cancelled',
        items: 4,
        payment: 'refunded',
        shipping: 'express'
    }
];

const statuses = ['All Status', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const paymentStatuses = ['All Payments', 'Paid', 'Pending', 'Refunded'];

const OrdersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All Status');
    const [selectedPayment, setSelectedPayment] = useState('All Payments');
    // const [sortBy, setSortBy] = useState('date');

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'delivered': return <CheckCircle className="w-4 h-4" />;
            case 'shipped': return <Truck className="w-4 h-4" />;
            case 'processing': return <RefreshCw className="w-4 h-4" />;
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'cancelled': return <XCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            case 'shipped': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
            case 'processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
            case 'pending': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
            case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
        }
    };

    const getPaymentColor = (payment: string) => {
        switch (payment) {
            case 'paid': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
            case 'refunded': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = selectedStatus === 'All Status' ||
            order.status === selectedStatus.toLowerCase();

        const matchesPayment = selectedPayment === 'All Payments' ||
            order.payment === selectedPayment.toLowerCase();

        return matchesSearch && matchesStatus && matchesPayment;
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
                            <span className="text-white">Orders</span>
                        </nav>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-slide-in-top">
                            Order Management
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 animate-slide-in-top animate-delay-100">
                            Manage and track your customer orders
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
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">1,248</p>
                            </div>
                            <div className="w-12 h-12 bg-linear-to-r from-primary-blue to-primary-purple rounded-xl flex items-center justify-center">
                                <ShoppingCart className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">+12% from last month</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/20 dark:bg-gray-800/80 animate-slide-in-top animate-delay-75">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Orders</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
                            </div>
                            <div className="w-12 h-12 bg-linear-to-r from-primary-purple to-primary-pink rounded-xl flex items-center justify-center">
                                <Clock className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">Need attention</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/20 dark:bg-gray-800/80 animate-slide-in-top animate-delay-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">$45,280</p>
                            </div>
                            <div className="w-12 h-12 bg-linear-to-r from-accent-green to-primary-blue rounded-xl flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">+18% from last month</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/20 dark:bg-gray-800/80 animate-slide-in-top animate-delay-150">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Order Value</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">$89.50</p>
                            </div>
                            <div className="w-12 h-12 bg-linear-to-r from-accent-pink to-primary-purple rounded-xl flex items-center justify-center">
                                <ShoppingCart className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">+5% from last month</p>
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
                                    placeholder="Search orders, customers, or emails..."
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
                                    title="payment"
                                    value={selectedPayment}
                                    onChange={(e) => setSelectedPayment(e.target.value)}
                                    className="px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-800/50 dark:border-gray-700"
                                >
                                    {paymentStatuses.map(status => (
                                        <option key={status} value={status}>{status}</option>
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
                            <button className="flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-primary-blue to-primary-purple text-white rounded-xl hover:opacity-90 transition-opacity">
                                <Filter className="w-4 h-4" />
                                <span>Advanced Filter</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/20 dark:bg-gray-800/80 overflow-hidden animate-slide-in-bottom">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200/20 dark:border-gray-700/20">
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Order</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Customer</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Date</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Amount</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Status</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Payment</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200/20 dark:divide-gray-700/20">
                                {filteredOrders.map((order, index) => (
                                    <tr
                                        key={order.id}
                                        className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors animate-slide-in-left"
                                        style={{ animationDelay: `${index * 0.05}s` }}
                                    >
                                        <td className="py-4 px-6">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{order.id}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{order.items} items • {order.shipping}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{order.customer}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{order.email}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-gray-900 dark:text-white">{order.date}</td>
                                        <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">{order.amount}</td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                <span className="capitalize">{order.status}</span>
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentColor(order.payment)}`}>
                                                <span className="capitalize">{order.payment}</span>
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-2">
                                                <button className="p-2 text-gray-400 hover:text-primary-blue transition-colors" title="View Details">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-primary-purple transition-colors" title="Edit Order">
                                                    <Edit className="w-4 h-4" />
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
                    {filteredOrders.length === 0 && (
                        <div className="text-center py-12">
                            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No orders found</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">
                                {searchTerm || selectedStatus !== 'All Status' || selectedPayment !== 'All Payments'
                                    ? 'Try adjusting your search or filters to find what you are looking for.'
                                    : 'No orders have been placed yet.'
                                }
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredOrders.length > 0 && (
                        <div className="px-6 py-4 border-t border-gray-200/20 dark:border-gray-700/20">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredOrders.length}</span> of{' '}
                                    <span className="font-medium">1,248</span> orders
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

                {/* Quick Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/20 dark:bg-gray-800/80 p-6 animate-slide-in-bottom">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
                        <div className="space-y-4">
                            {filteredOrders.slice(0, 3).map((order) => (
                                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${order.status === 'delivered' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' :
                                                order.status === 'shipped' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' :
                                                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30' :
                                                        'bg-orange-100 text-orange-600 dark:bg-orange-900/30'
                                            }`}>
                                            {getStatusIcon(order.status)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">{order.id}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Order {order.status}</p>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{order.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Status Overview */}
                    <div className="bg-linear-to-br from-primary-blue via-primary-purple to-primary-pink rounded-2xl p-6 text-white animate-zoom-in">
                        <h2 className="text-xl font-semibold mb-4">Order Status</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span>Pending</span>
                                <span className="font-semibold">24</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Processing</span>
                                <span className="font-semibold">18</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Shipped</span>
                                <span className="font-semibold">42</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Delivered</span>
                                <span className="font-semibold">1,152</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Cancelled</span>
                                <span className="font-semibold">12</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/20">
                            <p className="text-sm text-white/80 mb-3">Need help with an order?</p>
                            <button className="w-full bg-white text-primary-purple py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;